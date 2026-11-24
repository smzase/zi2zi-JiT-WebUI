from __future__ import annotations

import json
import mimetypes
import os
import re
import sys
import tempfile
import threading
from collections import OrderedDict
from pathlib import Path
from typing import Any
from urllib.parse import quote
from uuid import uuid4

from fastapi import FastAPI, File, Form, HTTPException, Query, UploadFile
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .charts import (
    latest_summary_from_records,
    run_parameter_rows,
    training_figures,
)
from .checkpoints import checkpoint_sidecar_path, read_checkpoint_sidecar
from .devices import detect_devices, disk_free_gb
from .font_builder import FontMetadata, validate_font_metadata
from .generation_batches import (
    batch_choices,
    candidates_for_codepoint,
    load_and_prune_selections,
    review_page_details as generation_review_page_details,
    scan_generation_batch,
    validate_batch_path,
)
from .inference import (
    build_generation_request,
    choose_diverse_references,
    exclude_existing_target_glyphs,
    render_style_references,
    write_generation_request,
)
from .jobs import JobManager
from .presets import (
    preset_catalog,
    resolve_selection,
    resolve_selection_by_region,
    write_selection_manifest,
)
from .project_packages import inspect_project_package
from .services import (
    ROOT,
    clamp_training_retry_command,
    copy_project_input,
    dataset_command,
    dataset_size_preset,
    font_dataset_capacity,
    generation_checkpoint_options,
    generation_command,
    import_model,
    infer_checkpoint_model,
    queue_checkpoint_validation,
    queue_official_model_download,
    resolve_generation_checkpoint,
    resolve_training_dataset,
    training_command,
)
from .storage import Storage
from .telemetry import (
    IncrementalMetricsCache,
    export_metrics_csv,
    export_metrics_json,
)

STATIC_DIR = Path(__file__).resolve().parent / "static"


def training_snapshot_items(
    records: list[tuple[str, list[dict[str, Any]]]],
    language: str = "zh",
    limit: int = 24,
) -> list[tuple[str, str]]:
    items: list[tuple[str, str]] = []
    seen: set[tuple[str, int, str]] = set()
    for run_id, events in records:
        for event in events:
            if event.get("phase") != "evaluation":
                continue
            try:
                epoch_number = int(event.get("epoch", 0)) + 1
            except (TypeError, ValueError):
                epoch_number = 1
            snapshot_root = Path(str(event.get("snapshot_path") or ""))
            if not snapshot_root.is_dir():
                continue
            for path in sorted(snapshot_root.glob("*.png")):
                key = (run_id, epoch_number, str(path.resolve()))
                if key in seen:
                    continue
                seen.add(key)
                try:
                    group_number = int(path.stem.rsplit("_", 1)[-1]) + 1
                except ValueError:
                    group_number = 1
                caption = (
                    f"Run {run_id} · 第 {epoch_number} 轮 · 第 {group_number} 组"
                    f"（每对：目标真值 -> 当前生成）"
                    if language != "en"
                    else f"Run {run_id} · Epoch {epoch_number} · Group {group_number} "
                    f"(each pair: target -> generated)"
                )
                items.append((str(path), caption))
    return items[-limit:]


def _file_url(path: str | Path, *, already_resolved: bool = False) -> str:
    target = Path(path) if already_resolved else Path(path).resolve()
    return "/api/files?path=" + quote(str(target), safe="")


async def _save_upload(upload: UploadFile, dest_dir: Path) -> Path:
    dest_dir.mkdir(parents=True, exist_ok=True)
    raw_name = Path(upload.filename or f"upload-{uuid4().hex}").name
    safe_name = raw_name or f"upload-{uuid4().hex}"
    target = dest_dir / safe_name
    with target.open("wb") as handle:
        while True:
            chunk = await upload.read(1024 * 1024)
            if not chunk:
                break
            handle.write(chunk)
    await upload.close()
    return target


class CreateProjectBody(BaseModel):
    name: str


class DeleteProjectBody(BaseModel):
    confirmed: bool = False


class ExportProjectBody(BaseModel):
    mode: str = "lightweight"
    include_shared_models: bool = False


class ImportProjectBody(BaseModel):
    staged_path: str
    confirmed: bool = False


class DownloadModelBody(BaseModel):
    model_name: str


class AttachSharedModelBody(BaseModel):
    model_path: str


class DatasetCapacityBody(BaseModel):
    charset: str = "auto"
    test_count: int = 64


class DatasetBuildBody(BaseModel):
    train_count: int = 3000
    test_count: int = 64
    charset: str = "auto"
    workers: int = 4


class StartTrainingBody(BaseModel):
    dataset_path: str = ""
    device: str = "0"
    quality: str = "balanced"
    epochs: int = 200
    horizontal_flip_prob: float = 0.0


class ResumeTrainingBody(BaseModel):
    run_id: str
    dataset_path: str = ""
    device: str = "0"
    epochs: int = 200
    horizontal_flip_prob: float = 0.0


class DashboardBody(BaseModel):
    run_ids: list[str] = []
    language: str = "zh"


class ExportMetricsBody(BaseModel):
    run_id: str


class SelectCandidateBody(BaseModel):
    batch_path: str
    codepoint: str
    image_path: str


class FontBuildBody(BaseModel):
    generation_batch: str
    family: str
    style: str = "Regular"
    version: str = "1.000"
    designer: str = ""
    license_text: str = ""
    profiles: list[str] = ["proportional"]
    threshold: int = 180
    despeckle: int = 4


def build_app(
    storage: Storage,
    jobs: JobManager,
    *,
    language: str = "zh",
    tensorboard_url: str = "http://127.0.0.1:6006",
) -> FastAPI:
    app = FastAPI(title="zi2zi-JiT Font Studio", docs_url="/api/docs")
    metrics_cache = IncrementalMetricsCache()
    default_language = "en" if language == "en" else "zh"

    def _safe_resolve_under_root(raw_path: str) -> Path:
        resolved = Path(raw_path).expanduser().resolve()
        root = storage.root.resolve()
        if resolved != root and root not in resolved.parents:
            raise HTTPException(status_code=403, detail="Path outside workspace storage")
        if not resolved.is_file():
            raise HTTPException(status_code=404, detail="File not found")
        return resolved

    def _ensure_checkpoint_validation(model_path: str, project_id: str | None = None) -> str:
        resolved = str(Path(model_path).resolve())
        for job in jobs.list_jobs(project_id=project_id, limit=200):
            if (
                job["job_type"] == "checkpoint_validation"
                and job["status"] in {"queued", "running"}
                and resolved in json.loads(job["command_json"])
            ):
                return job["id"]
        return queue_checkpoint_validation(
            jobs,
            resolved,
            project_id=project_id,
            provenance_note=(
                "Shared model directory is trusted by local single-user policy. "
                "Digest is recorded for audit/change detection, not provenance proof."
            ),
        )

    def _project_runs(project_id: str) -> list[dict[str, Any]]:
        runs = storage.list_training_runs(project_id) if project_id else []
        for item in runs:
            job_id = item.get("parameters", {}).get("job_id")
            if job_id:
                try:
                    job = jobs.get_job(job_id)
                    item["status"] = job["status"]
                    item["error"] = job.get("error") or ""
                    item["progress"] = job.get("progress") or 0
                except KeyError:
                    pass
        return runs

    def _project_dataset_path(project_id: str) -> str:
        project = storage.get_project(project_id)
        stored = str(project.training.get("dataset_path") or "").strip()
        if stored:
            return stored
        try:
            return str(resolve_training_dataset(project, storage))
        except ValueError:
            return ""

    def _shared_models() -> list[dict[str, Any]]:
        items = []
        for item in sorted(storage.models_dir.glob("*")):
            if item.suffix.lower() not in {".pth", ".pt", ".ckpt"}:
                continue
            meta = None
            try:
                meta = read_checkpoint_sidecar(item)
            except (FileNotFoundError, OSError, ValueError):
                meta = None
            items.append(
                {
                    "name": item.name,
                    "path": str(item.resolve()),
                    "size_mb": round(item.stat().st_size / (1024**2), 1),
                    "validated": meta is not None,
                    "architecture": meta.get("architecture") if meta else None,
                    "sha256": meta.get("sha256") if meta else None,
                }
            )
        return items

    def _export_packages() -> list[dict[str, Any]]:
        export_root = storage.root / "project-exports"
        export_root.mkdir(parents=True, exist_ok=True)
        return [
            {
                "name": path.name,
                "path": str(path.resolve()),
                "url": _file_url(path),
                "size_mb": round(path.stat().st_size / (1024**2), 2),
                "mtime": path.stat().st_mtime,
            }
            for path in sorted(
                export_root.glob("*.zi2zi-project.zip"),
                key=lambda item: item.stat().st_mtime_ns,
                reverse=True,
            )
        ]

    def _project_detail(project_id: str) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        checkpoints, preferred_checkpoint = generation_checkpoint_options(project, storage)
        for _label, checkpoint in checkpoints:
            if not checkpoint_sidecar_path(checkpoint).is_file():
                _ensure_checkpoint_validation(checkpoint, project_id)
        batches, preferred_batch = batch_choices(
            storage.project_dir(project_id) / "generation"
        )
        return {
            "manifest": project.to_dict(),
            "dataset_path": _project_dataset_path(project_id),
            "runs": _project_runs(project_id),
            "generation_checkpoints": [
                {"label": label, "path": value} for label, value in checkpoints
            ],
            "preferred_checkpoint": preferred_checkpoint,
            "generation_batches": [
                {"label": label, "path": value} for label, value in batches
            ],
            "preferred_batch": preferred_batch,
        }

    @app.get("/api/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/api/bootstrap")
    def bootstrap(lang: str | None = None) -> dict[str, Any]:
        active_lang = "en" if (lang or default_language) == "en" else "zh"
        devices = detect_devices()
        catalog = [
            item
            for item in preset_catalog(active_lang)
            if item["id"] not in {"ja-joyo", "ja-kana"}
        ]
        projects = [item.to_dict() for item in storage.list_projects()]
        return {
            "language": active_lang,
            "tensorboard_url": tensorboard_url,
            "data_root": str(storage.root),
            "disk_free_gb": disk_free_gb(storage.root),
            "devices": [
                {
                    "id": item.id,
                    "name": item.name,
                    "backend": item.backend,
                    "memory_total_gb": item.memory_total_gb,
                    "training_supported": item.training_supported,
                }
                for item in devices
            ],
            "presets": catalog,
            "projects": projects,
            "shared_models": _shared_models(),
            "export_packages": _export_packages(),
            "jobs": jobs.list_jobs(limit=100),
        }

    @app.get("/api/projects")
    def list_projects() -> dict[str, Any]:
        return {"projects": [item.to_dict() for item in storage.list_projects()]}

    @app.post("/api/projects")
    def create_project(body: CreateProjectBody) -> dict[str, Any]:
        try:
            project = storage.create_project(body.name)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return {"project": project.to_dict()}

    @app.get("/api/projects/{project_id}")
    def get_project(project_id: str) -> dict[str, Any]:
        return _project_detail(project_id)

    @app.delete("/api/projects/{project_id}")
    def delete_project(project_id: str, body: DeleteProjectBody) -> dict[str, Any]:
        if not body.confirmed:
            raise HTTPException(
                status_code=400,
                detail="Confirm permanent project deletion first",
            )
        try:
            deleted = storage.delete_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        except (ValueError, OSError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return {"deleted": deleted.to_dict()}

    @app.post("/api/projects/{project_id}/export")
    def export_project(project_id: str, body: ExportProjectBody) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        safe_name = re.sub(r"[^\w.-]+", "-", project.name, flags=re.UNICODE).strip(".-")
        safe_name = safe_name[:80] or "project"
        export_root = storage.root / "project-exports"
        export_root.mkdir(parents=True, exist_ok=True)
        mode = "full" if body.mode == "full" else "lightweight"
        output = (
            export_root
            / f"{safe_name}-{project.id[:8]}-{uuid4().hex[:8]}-{mode}.zi2zi-project.zip"
        )
        command = [
            sys.executable,
            str(ROOT / "scripts" / "project_package.py"),
            "export",
            "--data-dir",
            str(storage.root),
            "--project-id",
            project.id,
            "--output",
            str(output),
            "--mode",
            mode,
        ]
        if body.include_shared_models:
            command.append("--include-shared-models")
        job_id = jobs.submit("project_export", command, project_id=project.id, cwd=ROOT)
        return {"job_id": job_id, "output_path": str(output)}

    @app.get("/api/project-packages")
    def list_project_packages() -> dict[str, Any]:
        return {"packages": _export_packages()}

    @app.post("/api/project-packages/inspect")
    async def inspect_package(file: UploadFile = File(...)) -> dict[str, Any]:
        incoming = storage.root / "imports"
        incoming.mkdir(parents=True, exist_ok=True)
        staged = incoming / f"{uuid4().hex}.zi2zi-project.zip"
        with staged.open("wb") as handle:
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk:
                    break
                handle.write(chunk)
        await file.close()
        try:
            inspection = inspect_project_package(staged)
        except (FileNotFoundError, OSError, ValueError) as exc:
            staged.unlink(missing_ok=True)
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return {"staged_path": str(staged), "inspection": inspection}

    @app.post("/api/project-packages/import")
    def import_package(body: ImportProjectBody) -> dict[str, Any]:
        if not body.confirmed:
            raise HTTPException(status_code=400, detail="Confirm import as a new project")
        staged = _safe_resolve_under_root(body.staged_path)
        command = [
            sys.executable,
            str(ROOT / "scripts" / "project_package.py"),
            "import",
            "--data-dir",
            str(storage.root),
            "--package",
            str(staged),
            "--delete-package-after",
        ]
        job_id = jobs.submit("project_import", command, cwd=ROOT)
        return {"job_id": job_id}

    @app.get("/api/models/shared")
    def list_shared_models() -> dict[str, Any]:
        return {"models": _shared_models()}

    @app.post("/api/models/download")
    def download_official_model(body: DownloadModelBody) -> dict[str, Any]:
        try:
            job_id = queue_official_model_download(jobs, storage, body.model_name)
        except KeyError as exc:
            raise HTTPException(status_code=400, detail="Unknown official model") from exc
        return {"job_id": job_id}

    @app.post("/api/projects/{project_id}/models/attach-shared")
    def attach_shared_model(project_id: str, body: AttachSharedModelBody) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        model_path = _safe_resolve_under_root(body.model_path)
        project.base_model = str(model_path)
        project.active_checkpoint = str(model_path)
        storage.save_project(project)
        try:
            metadata = read_checkpoint_sidecar(model_path)
            return {"attached": str(model_path), "metadata": metadata, "validation_job_id": None}
        except (FileNotFoundError, OSError, ValueError):
            job_id = _ensure_checkpoint_validation(str(model_path), project_id)
            return {"attached": str(model_path), "metadata": None, "validation_job_id": job_id}

    @app.post("/api/projects/{project_id}/models/import")
    async def upload_model(
        project_id: str,
        file: UploadFile = File(...),
        trusted: bool = Form(False),
    ) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        with tempfile.TemporaryDirectory() as tmp_dir:
            saved = await _save_upload(file, Path(tmp_dir))
            try:
                metadata = import_model(storage, saved, trusted=trusted)
            except ValueError as exc:
                raise HTTPException(status_code=400, detail=str(exc)) from exc
        project.base_model = metadata["path"]
        project.active_checkpoint = metadata["path"]
        storage.save_project(project)
        return {"metadata": metadata, "manifest": project.to_dict()}

    @app.post("/api/projects/{project_id}/assets")
    async def save_project_assets(
        project_id: str,
        input_mode: str = Form("font"),
        source_fonts: list[UploadFile] = File(default=[]),
        target_files: list[UploadFile] = File(default=[]),
        sc_fonts: list[UploadFile] = File(default=[]),
        tc_fonts: list[UploadFile] = File(default=[]),
        jp_fonts: list[UploadFile] = File(default=[]),
        kr_fonts: list[UploadFile] = File(default=[]),
    ) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc

        project.input_mode = "glyphs" if input_mode == "glyphs" else "font"
        with tempfile.TemporaryDirectory() as tmp_root:
            tmp_path = Path(tmp_root)
            if source_fonts:
                saved = [await _save_upload(f, tmp_path / "src") for f in source_fonts if f.filename]
                if saved:
                    project.global_source_fonts = [
                        str(copy_project_input(storage, project_id, item, "source-font"))
                        for item in saved
                    ]
            if target_files:
                saved = [await _save_upload(f, tmp_path / "tgt") for f in target_files if f.filename]
                category = "target-font" if project.input_mode == "font" else "target-glyphs"
                copied = [copy_project_input(storage, project_id, item, category) for item in saved]
                if copied:
                    if project.input_mode == "glyphs":
                        project.target_assets = [str(copied[0].parent)]
                    else:
                        project.target_assets = [str(copied[0])]
            for region, uploads in (
                ("SC", sc_fonts),
                ("TC", tc_fonts),
                ("JP", jp_fonts),
                ("KR", kr_fonts),
            ):
                if uploads:
                    saved = [
                        await _save_upload(f, tmp_path / f"reg-{region}")
                        for f in uploads
                        if f.filename
                    ]
                    if saved:
                        project.regional_source_fonts[region] = [
                            str(
                                copy_project_input(
                                    storage,
                                    project_id,
                                    item,
                                    f"source-{region.lower()}",
                                )
                            )
                            for item in saved
                        ]

        if project.input_mode == "font" and project.target_assets:
            try:
                project.style_reference_pool = render_style_references(
                    project.target_assets[0],
                    storage.project_dir(project_id) / "inputs" / "style-references",
                )
            except (OSError, ValueError) as exc:
                raise HTTPException(status_code=400, detail=str(exc)) from exc
        elif project.input_mode == "glyphs" and project.target_assets:
            from data_processing.font_utils import scan_rendered_glyphs

            candidates = []
            for asset in project.target_assets:
                path = Path(asset)
                if path.is_dir():
                    try:
                        candidates.extend(scan_rendered_glyphs(path).values())
                    except ValueError as exc:
                        raise HTTPException(status_code=400, detail=str(exc)) from exc
                elif path.suffix.lower() in {".png", ".jpg", ".jpeg"}:
                    candidates.append(path)
            project.style_reference_pool = choose_diverse_references(candidates, 8)
            if len(project.style_reference_pool) < 8:
                raise HTTPException(
                    status_code=400,
                    detail="At least 8 valid target glyph images are required for style references",
                )
        storage.save_project(project)
        return {"manifest": project.to_dict()}

    @app.post("/api/projects/{project_id}/dataset/capacity")
    def dataset_capacity(project_id: str, body: DatasetCapacityBody) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
            capacity = font_dataset_capacity(project, body.charset)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        except (OSError, ValueError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        test_count = max(int(body.test_count), 1)
        return {
            "capacity": capacity,
            "max_train": max(capacity - test_count, 0),
        }

    @app.get("/api/dataset/preset/{name}")
    def get_dataset_preset(name: str) -> dict[str, int]:
        try:
            train_count, test_count = dataset_size_preset(name)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return {"train_count": train_count, "test_count": test_count}

    @app.post("/api/projects/{project_id}/dataset/build")
    def build_dataset(project_id: str, body: DatasetBuildBody) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        if body.train_count < 9:
            raise HTTPException(status_code=400, detail="Training needs at least 9 distinct glyphs")
        if body.test_count < 1:
            raise HTTPException(status_code=400, detail="Validation glyph count must be at least 1")
        try:
            capacity = font_dataset_capacity(project, body.charset)
        except (OSError, ValueError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        if body.train_count + body.test_count > capacity:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"Usable common glyphs: {capacity}. Requested {body.train_count + body.test_count}; "
                    f"reduce training to at most {max(capacity - body.test_count, 0)}."
                ),
            )
        command, output = dataset_command(
            project,
            storage,
            train_count=int(body.train_count),
            test_count=int(body.test_count),
            charset=body.charset,
            workers=int(body.workers),
        )
        project.training["dataset_path"] = str(output)
        storage.save_project(project)
        job_id = jobs.submit("dataset", command, project_id=project_id, cwd=ROOT)
        return {
            "job_id": job_id,
            "dataset_path": str(output),
            "capacity": capacity,
        }

    @app.post("/api/projects/{project_id}/training/start")
    def start_training(project_id: str, body: StartTrainingBody) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        if not project.base_model:
            raise HTTPException(status_code=400, detail="Attach a base model first")
        if not 0.0 <= float(body.horizontal_flip_prob) <= 0.5:
            raise HTTPException(
                status_code=400,
                detail="Horizontal flip probability must be between 0.0 and 0.5",
            )
        overrides: dict[str, Any] = {
            "epochs": int(body.epochs),
            "horizontal_flip_prob": float(body.horizontal_flip_prob),
        }
        try:
            metadata = read_checkpoint_sidecar(project.base_model)
        except (FileNotFoundError, OSError, ValueError) as exc:
            job_id = _ensure_checkpoint_validation(project.base_model, project_id)
            raise HTTPException(
                status_code=400,
                detail=f"Checkpoint metadata is missing or stale. Validation job {job_id} is running.",
            ) from exc
        for key in ("num_fonts", "num_chars"):
            if metadata.get(key):
                overrides[key] = metadata[key]
        model_variant = infer_checkpoint_model(project.base_model, metadata)
        if not model_variant:
            raise HTTPException(
                status_code=400,
                detail="Cannot determine checkpoint architecture (JiT-B/16 vs JiT-L/16)",
            )
        overrides["model"] = model_variant
        try:
            run, command = training_command(
                project, storage, body.dataset_path, body.device, body.quality, overrides
            )
        except (OSError, ValueError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        job_id = jobs.submit(
            "training",
            command,
            project_id=project_id,
            cwd=ROOT,
            gpu=body.device,
            resume_point=Path(run.metrics_path).parent / "checkpoint-last.pth",
        )
        run.parameters["job_id"] = job_id
        storage.save_training_run(run)
        return {"run_id": run.id, "job_id": job_id, "architecture": model_variant}

    @app.post("/api/projects/{project_id}/training/resume")
    def resume_training(project_id: str, body: ResumeTrainingBody) -> dict[str, Any]:
        parent = next(
            (item for item in _project_runs(project_id) if item["id"] == body.run_id),
            None,
        )
        if not parent:
            raise HTTPException(status_code=404, detail="Training run not found")
        checkpoint = (
            storage.project_dir(project_id)
            / "training"
            / parent["id"]
            / "checkpoint-last.pth"
        )
        if not checkpoint.is_file():
            raise HTTPException(status_code=400, detail="Selected run has no checkpoint-last.pth")
        source_dataset = parent.get("parameters", {}).get("dataset_path") or body.dataset_path
        if not source_dataset:
            raise HTTPException(status_code=400, detail="Original dataset path is unavailable")
        overrides = dict(parent.get("parameters", {}))
        overrides["epochs"] = int(body.epochs)
        if not 0.0 <= float(body.horizontal_flip_prob) <= 0.5:
            raise HTTPException(
                status_code=400,
                detail="Horizontal flip probability must be between 0.0 and 0.5",
            )
        overrides["horizontal_flip_prob"] = float(body.horizontal_flip_prob)
        try:
            run, command = training_command(
                storage.get_project(project_id),
                storage,
                source_dataset,
                body.device,
                "balanced",
                overrides,
                resume_checkpoint=checkpoint,
                parent_run_id=parent["id"],
            )
        except (OSError, ValueError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        job_id = jobs.submit(
            "training",
            command,
            project_id=project_id,
            cwd=ROOT,
            gpu=body.device,
            resume_point=Path(run.metrics_path).parent / "checkpoint-last.pth",
        )
        run.parameters["job_id"] = job_id
        storage.save_training_run(run)
        return {"run_id": run.id, "job_id": job_id, "parent_run_id": parent["id"]}

    @app.delete("/api/projects/{project_id}/training/runs/{run_id}")
    def delete_training_run(
        project_id: str,
        run_id: str,
        confirmed: bool = Query(False),
    ) -> dict[str, Any]:
        if not confirmed:
            raise HTTPException(status_code=400, detail="Confirm permanent deletion first")
        selected = next(
            (item for item in _project_runs(project_id) if item["id"] == run_id),
            None,
        )
        if not selected:
            raise HTTPException(status_code=404, detail="Training run not found")
        if selected.get("status") in {"queued", "running"}:
            raise HTTPException(
                status_code=400,
                detail="Cancel the active job before deleting its run",
            )
        storage.delete_training_run(project_id, run_id)
        return {"deleted_run_id": run_id}

    @app.post("/api/projects/{project_id}/training/dashboard")
    def training_dashboard(project_id: str, body: DashboardBody) -> dict[str, Any]:
        runs = _project_runs(project_id)
        selected = [item for item in runs if item["id"] in (body.run_ids or [])][:5]
        records = [
            (item["id"][:8], metrics_cache.read(item["metrics_path"]))
            for item in selected
        ]
        series: dict[str, list[dict[str, Any]]] = {
            "loss": [],
            "lr": [],
            "resources": [],
            "evaluation": [],
        }
        specs = (
            ("loss", ("loss", "loss_ema"), "global_step"),
            ("lr", ("lr",), "global_step"),
            (
                "resources",
                ("gpu_memory_allocated_gb", "gpu_memory_reserved_gb", "gpu_utilization", "ram_percent"),
                "global_step",
            ),
            ("evaluation", ("ssim", "lpips", "l1", "fid"), "epoch"),
        )
        for chart_key, metric_keys, x_key in specs:
            for run_name, events in records:
                for metric_key in metric_keys:
                    points = [
                        {"x": item.get(x_key), "y": item.get(metric_key)}
                        for item in events
                        if item.get(x_key) is not None and item.get(metric_key) is not None
                    ]
                    if points:
                        series[chart_key].append(
                            {
                                "label": f"{run_name} · {metric_key}",
                                "metric": metric_key,
                                "points": points,
                            }
                        )
        checkpoints = [
            {
                "run": run_id,
                "epoch": event.get("epoch"),
                "kind": event.get("kind"),
                "metric": event.get("metric", ""),
                "path": event.get("path", ""),
            }
            for run_id, events in records
            for event in events
            if event.get("phase") == "checkpoint"
        ]
        alerts = [
            {
                "run": run_id,
                "epoch": event.get("epoch", ""),
                "step": event.get("global_step", ""),
                "alert": event.get("alert") or event.get("error"),
            }
            for run_id, events in records
            for event in events
            if event.get("alert") or event.get("phase") == "fatal"
        ]
        snapshots = [
            {"url": _file_url(path), "caption": caption}
            for path, caption in training_snapshot_items(records, body.language)
        ]
        summary_text = (
            latest_summary_from_records(records[0][1]) if selected else ""
        )
        return {
            "runs": runs,
            "series": series,
            "parameter_headers": ["parameter", *[item["id"][:8] for item in selected]],
            "parameter_rows": run_parameter_rows(selected),
            "summary": summary_text,
            "error": selected[0].get("error") if selected else "",
            "checkpoints": checkpoints,
            "alerts": alerts,
            "snapshots": snapshots,
        }

    @app.post("/api/projects/{project_id}/training/export-metrics")
    def export_run_metrics(project_id: str, body: ExportMetricsBody) -> dict[str, Any]:
        selected = next(
            (item for item in _project_runs(project_id) if item["id"] == body.run_id),
            None,
        )
        if not selected:
            raise HTTPException(status_code=404, detail="Training run not found")
        destination = storage.project_dir(project_id) / "exports"
        csv_path = export_metrics_csv(
            selected["metrics_path"], destination / f"{selected['id']}-metrics.csv"
        )
        json_path = export_metrics_json(
            selected["metrics_path"], destination / f"{selected['id']}-metrics.json"
        )
        files = [csv_path, json_path]
        for name, figure in zip(
            ("loss", "learning-rate", "resources", "evaluation"),
            training_figures([selected["metrics_path"]]),
        ):
            path = destination / f"{selected['id']}-{name}.png"
            figure.savefig(path, dpi=160)
            files.append(path)
        return {
            "files": [
                {"name": item.name, "path": str(item), "url": _file_url(item)}
                for item in files
            ]
        }

    @app.post("/api/projects/{project_id}/generation/build")
    async def build_generation(
        project_id: str,
        text: str = Form(""),
        preset_ids: str = Form("[]"),
        split_regions: bool = Form(True),
        primary_region: str = Form("SC"),
        device: str = Form("0"),
        generation_checkpoint: str = Form(""),
        seed: int = Form(42),
        candidates: int = Form(1),
        allow_large_candidates: bool = Form(False),
        custom_file: UploadFile | None = File(default=None),
    ) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        try:
            parsed_presets = json.loads(preset_ids) if preset_ids else []
        except json.JSONDecodeError as exc:
            raise HTTPException(status_code=400, detail="Invalid preset_ids JSON") from exc

        try:
            selected_checkpoint = resolve_generation_checkpoint(
                project, storage, generation_checkpoint
            )
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

        with tempfile.TemporaryDirectory() as tmp_dir:
            custom_file_path = None
            if custom_file and custom_file.filename:
                custom_file_path = await _save_upload(custom_file, Path(tmp_dir))
            requested_codepoints, increments = resolve_selection(
                parsed_presets,
                custom_text=text or "",
                custom_file=custom_file_path,
            )
            target_font_path = (
                project.target_assets[0]
                if project.input_mode == "font" and project.target_assets
                else None
            )
            codepoints, skipped_existing = exclude_existing_target_glyphs(
                requested_codepoints, target_font_path
            )
            if int(candidates) > 1 and len(codepoints) > 64 and not allow_large_candidates:
                raise HTTPException(
                    status_code=400,
                    detail="Candidate generation is limited to 64 glyphs unless explicitly unlocked",
                )
            request_id = uuid4().hex[:10]
            if split_regions:
                regional = resolve_selection_by_region(
                    parsed_presets,
                    primary_region=primary_region,
                    custom_text=text or "",
                    custom_file=custom_file_path,
                )
                skipped_set = set(skipped_existing)
                regional = {
                    region: [cp for cp in cps if cp not in skipped_set]
                    for region, cps in regional.items()
                }
                regional = {r: cps for r, cps in regional.items() if cps}
            else:
                regional = {primary_region: codepoints} if codepoints else {}

        if not regional:
            return {
                "job_ids": [],
                "outputs": [],
                "generated_count": 0,
                "skipped_existing_count": len(skipped_existing),
                "message": (
                    f"No generation required: all {len(requested_codepoints)} requested "
                    "characters already exist in the target font."
                ),
            }
        if len(project.style_reference_pool) < 8:
            raise HTTPException(
                status_code=400,
                detail="The project needs at least 8 style references",
            )
        request_dir = storage.project_dir(project_id) / "generation" / f"request-{request_id}"
        payloads = {}
        fallbacks = []
        try:
            for region, region_codepoints in regional.items():
                source_fonts = project.source_fonts_for_region(region)
                if not source_fonts:
                    raise ValueError(f"No source font is configured for region {region}")
                if not project.regional_source_fonts.get(region):
                    fallbacks.append(region)
                payloads[region] = build_generation_request(
                    region_codepoints,
                    source_fonts,
                    project.style_reference_pool,
                    project_id=project_id,
                    request_id=request_id,
                    region=region,
                    checkpoint=selected_checkpoint,
                    seed=int(seed),
                    candidates=int(candidates),
                )
        except (OSError, ValueError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

        request_dir.mkdir(parents=True, exist_ok=False)
        write_selection_manifest(
            request_dir / "charset.json",
            list(parsed_presets),
            requested_codepoints,
            increments,
        )
        (request_dir / "generation-plan.json").write_text(
            json.dumps(
                {
                    "schema_version": 2,
                    "kind": "zi2zi-generation-plan",
                    "request_id": request_id,
                    "target_font": target_font_path or "",
                    "checkpoint": selected_checkpoint,
                    "seed": int(seed),
                    "candidates": int(candidates),
                    "requested_count": len(requested_codepoints),
                    "skipped_existing_count": len(skipped_existing),
                    "generation_count": len(codepoints),
                    "regions": {r: p["count"] for r, p in payloads.items()},
                    "skipped_existing": [f"U+{v:04X}" for v in skipped_existing],
                    "generation_codepoints": [f"U+{v:04X}" for v in codepoints],
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )
        specifications = []
        outputs = []
        for region, payload in payloads.items():
            region_dir = request_dir / region
            request_manifest = write_generation_request(payload, region_dir / "request.json")
            command, output = generation_command(
                project,
                storage,
                request_manifest,
                device,
                seed=int(seed),
                candidates=int(candidates),
                output_dir=region_dir,
                request_manifest=True,
                checkpoint_path=selected_checkpoint,
            )
            outputs.append(str(output))
            specifications.append(
                {
                    "job_type": "generation",
                    "command": command,
                    "project_id": project_id,
                    "cwd": ROOT,
                    "gpu": device if str(device).isdigit() else None,
                }
            )
        job_ids = jobs.submit_many(specifications)
        project.active_checkpoint = selected_checkpoint
        project.inference["checkpoint"] = selected_checkpoint
        project.charset_presets = list(parsed_presets)
        project.split_regions = bool(split_regions)
        project.primary_region = primary_region
        storage.save_project(project)
        return {
            "job_ids": job_ids,
            "outputs": outputs,
            "generated_count": len(codepoints),
            "skipped_existing_count": len(skipped_existing),
            "fallbacks": sorted(set(fallbacks)),
            "checkpoint": Path(selected_checkpoint).name,
        }

    @app.get("/api/projects/{project_id}/review/page")
    def review_page(
        project_id: str,
        batch_path: str = Query(...),
        search: str = Query(""),
        page: int = Query(1),
        page_size: int = Query(100),
    ) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
            batch = validate_batch_path(storage.project_dir(project_id) / "generation", batch_path)
        except (KeyError, ValueError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        images, codepoints, current_page, total_pages, total_items = generation_review_page_details(
            batch,
            search=search,
            page=max(int(page), 1),
            page_size=min(max(int(page_size), 1), 200),
            primary_region=project.primary_region,
        )
        selection_path = storage.project_dir(project_id) / "glyphs" / "selection.json"
        selections = load_and_prune_selections(selection_path)
        items = []
        for path, codepoint in zip(images, codepoints):
            label = f"U+{codepoint:04X}"
            items.append(
                {
                    "codepoint": label,
                    "char": chr(codepoint),
                    "path": str(path),
                    "url": _file_url(path, already_resolved=True),
                    "manual": label in selections,
                }
            )
        return {
            "items": items,
            "page": current_page,
            "total_pages": total_pages,
            "total_items": total_items,
            "page_size": page_size,
        }

    @app.get("/api/projects/{project_id}/review/candidates")
    def review_candidates(
        project_id: str,
        batch_path: str = Query(...),
        codepoint: str = Query(...),
    ) -> dict[str, Any]:
        try:
            batch = validate_batch_path(storage.project_dir(project_id) / "generation", batch_path)
            cp_int = int(codepoint.removeprefix("U+"), 16)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        paths = candidates_for_codepoint(batch, cp_int)
        selection_path = storage.project_dir(project_id) / "glyphs" / "selection.json"
        selections = load_and_prune_selections(selection_path)
        selected_path = selections.get(codepoint)
        return {
            "codepoint": codepoint,
            "char": chr(cp_int),
            "selected_path": selected_path,
            "candidates": [
                {
                    "name": path.name,
                    "path": str(path),
                    "url": _file_url(path, already_resolved=True),
                    "selected": str(path) == selected_path,
                }
                for path in paths
            ],
        }

    @app.post("/api/projects/{project_id}/review/select")
    def select_candidate(project_id: str, body: SelectCandidateBody) -> dict[str, Any]:
        try:
            batch = validate_batch_path(
                storage.project_dir(project_id) / "generation", body.batch_path
            )
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        candidate = Path(body.image_path).resolve()
        if not candidate.is_file() or batch not in candidate.parents:
            raise HTTPException(
                status_code=400,
                detail="The selected candidate is not part of this batch",
            )
        path = storage.project_dir(project_id) / "glyphs" / "selection.json"
        values = load_and_prune_selections(path)
        values[body.codepoint] = str(candidate)
        path.write_text(json.dumps(values, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"codepoint": body.codepoint, "selected": candidate.name}

    @app.delete("/api/projects/{project_id}/review/select")
    def clear_candidate(project_id: str, codepoint: str = Query(...)) -> dict[str, Any]:
        path = storage.project_dir(project_id) / "glyphs" / "selection.json"
        values = load_and_prune_selections(path)
        removed = values.pop(codepoint, None)
        path.write_text(json.dumps(values, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"codepoint": codepoint, "cleared": bool(removed)}

    @app.post("/api/projects/{project_id}/export/build")
    def build_font(project_id: str, body: FontBuildBody) -> dict[str, Any]:
        try:
            project = storage.get_project(project_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Project not found") from exc
        project_dir = storage.project_dir(project_id)
        try:
            validate_font_metadata(
                FontMetadata(
                    family_name=str(body.family or ""),
                    style_name=str(body.style or ""),
                    version=str(body.version or ""),
                )
            )
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        selection = project_dir / "glyphs" / "selection.json"
        try:
            batch = validate_batch_path(project_dir / "generation", body.generation_batch)
            selected_values = load_and_prune_selections(selection)
            discovered_glyphs = scan_generation_batch(
                batch,
                primary_region=project.primary_region,
                selections=selected_values,
            )
        except (OSError, ValueError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        if not discovered_glyphs:
            raise HTTPException(
                status_code=400,
                detail="No U+XXXX-named glyph images were found in the selected batch",
            )
        export_selection = project_dir / "glyphs" / f"export-{uuid4().hex}.json"
        export_selection.write_text(
            json.dumps(
                {f"U+{cp:04X}": str(p) for cp, p in sorted(discovered_glyphs.items())},
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )
        base_font_path = ""
        if project.input_mode == "font":
            if not project.target_assets:
                raise HTTPException(status_code=400, detail="Project has no target font")
            base_font_path = project.target_assets[0]
            from fontTools.ttLib import TTFont

            base_font = TTFont(base_font_path)
            try:
                if "glyf" not in base_font or "hmtx" not in base_font:
                    raise HTTPException(
                        status_code=400,
                        detail="Incremental packaging requires a TrueType-outline target font",
                    )
                if "fvar" in base_font or "gvar" in base_font:
                    raise HTTPException(
                        status_code=400,
                        detail="Incremental packaging does not support variable-font targets",
                    )
            finally:
                base_font.close()
        job_ids = []
        for profile in body.profiles or ["proportional"]:
            suffix = "Text" if profile == "proportional" else "Mono"
            fonts_root = (project_dir / "fonts").resolve()
            output = (fonts_root / f"{body.family}-{suffix}-{body.version}.ttf").resolve()
            if output.parent != fonts_root:
                raise HTTPException(status_code=400, detail="Invalid font output path")
            command = [
                sys.executable,
                str(ROOT / "scripts" / "build_font.py"),
                "--glyph-dir",
                str(batch),
                "--output",
                str(output),
                "--family",
                f"{body.family} {suffix}",
                "--style",
                body.style,
                "--version",
                body.version,
                "--designer",
                body.designer,
                "--license",
                body.license_text,
                "--profile",
                profile,
                "--threshold",
                str(int(body.threshold)),
                "--despeckle-area",
                str(int(body.despeckle)),
                "--project-dir",
                str(project_dir),
            ]
            if base_font_path:
                command += ["--base-font", base_font_path]
            command += ["--selection-manifest", str(export_selection), "--selection-only"]
            job_ids.append(jobs.submit("font_build", command, project_id=project_id, cwd=ROOT))
        return {"job_ids": job_ids, "glyph_count": len(discovered_glyphs)}

    svg_dir_cache: OrderedDict[Path, tuple[int, int, tuple[str, ...]]] = OrderedDict()
    svg_cache_lock = threading.RLock()

    def _list_svg_names_cached(svg_dir: Path) -> tuple[str, ...]:
        resolved = svg_dir.resolve()
        try:
            st = os.stat(resolved)
        except OSError:
            return ()
        with svg_cache_lock:
            cached = svg_dir_cache.get(resolved)
            if cached is not None and cached[0] == st.st_mtime_ns and cached[1] == st.st_ctime_ns:
                svg_dir_cache.move_to_end(resolved)
                return cached[2]
        names: list[str] = []
        try:
            with os.scandir(resolved) as entries:
                for entry in entries:
                    if (
                        entry.name.lower().endswith(".svg")
                        and entry.is_file(follow_symlinks=False)
                    ):
                        names.append(entry.name)
        except OSError:
            return ()
        names.sort()
        result = tuple(names)
        with svg_cache_lock:
            svg_dir_cache[resolved] = (st.st_mtime_ns, st.st_ctime_ns, result)
            svg_dir_cache.move_to_end(resolved)
            while len(svg_dir_cache) > 16:
                svg_dir_cache.popitem(last=False)
        return result

    def _evenly_sample(names: tuple[str, ...], limit: int) -> list[str]:
        if limit <= 0 or not names:
            return []
        if len(names) <= limit:
            return list(names)
        if limit == 1:
            return [names[0]]
        last = len(names) - 1
        return [names[(idx * last) // (limit - 1)] for idx in range(limit)]

    @app.get("/api/projects/{project_id}/export/artifacts")
    def font_artifacts(
        project_id: str,
        svg_limit: int = Query(48, ge=0, le=200),
    ) -> dict[str, Any]:
        project_dir = storage.project_dir(project_id)
        fonts_dir = (project_dir / "fonts").resolve()
        artifact_rows: list[tuple[Path, int, int]] = []
        svg_dirs: list[tuple[Path, int]] = []
        if fonts_dir.is_dir():
            try:
                with os.scandir(fonts_dir) as entries:
                    for entry in entries:
                        name_lower = entry.name.lower()
                        try:
                            if entry.is_file(follow_symlinks=False):
                                if name_lower.endswith(
                                    (".ttf", ".zip", ".report.json", ".report.html")
                                ):
                                    st = entry.stat(follow_symlinks=False)
                                    artifact_rows.append(
                                        (Path(entry.path), st.st_mtime_ns, st.st_size)
                                    )
                            elif entry.is_dir(follow_symlinks=False):
                                candidate_svg = Path(entry.path) / "svg"
                                try:
                                    st = os.stat(candidate_svg)
                                    if candidate_svg.is_dir():
                                        svg_dirs.append((candidate_svg, st.st_mtime_ns))
                                except OSError:
                                    pass
                        except OSError:
                            continue
            except OSError:
                pass
        artifact_rows.sort(key=lambda row: row[1], reverse=True)
        fonts = [row for row in artifact_rows if row[0].suffix.lower() == ".ttf"]

        # Prefer the newest exported font's SVG directory first, then newest remaining dirs.
        preferred_svg_dir = fonts[0][0].with_suffix("") / "svg" if fonts else None
        svg_dirs.sort(
            key=lambda row: (
                0 if preferred_svg_dir is not None and row[0] == preferred_svg_dir else 1,
                -row[1],
            )
        )
        sampled_svgs: list[dict[str, str]] = []
        svg_total = 0
        for svg_dir, _dir_mtime in svg_dirs:
            names = _list_svg_names_cached(svg_dir)
            svg_total += len(names)
            if not sampled_svgs and names and svg_limit > 0:
                resolved_svg_dir = svg_dir.resolve()
                for name in _evenly_sample(names, svg_limit):
                    sampled_svgs.append(
                        {"name": name, "url": _file_url(resolved_svg_dir / name, already_resolved=True)}
                    )

        return {
            "artifacts": [
                {
                    "name": item.name,
                    "path": str(item),
                    "url": _file_url(item, already_resolved=True),
                    "size_kb": round(size_bytes / 1024, 1),
                    "ext": item.suffix.lower(),
                }
                for item, _mtime_ns, size_bytes in artifact_rows
            ],
            "svgs": sampled_svgs,
            "svg_total": svg_total,
            "preview_font_url": _file_url(fonts[0][0], already_resolved=True) if fonts else None,
            "preview_font_name": fonts[0][0].name if fonts else None,
            "preview_font_version": str(fonts[0][1]) if fonts else None,
        }

    @app.get("/api/jobs")
    def list_jobs(project_id: str | None = None, limit: int = 100) -> dict[str, Any]:
        return {"jobs": jobs.list_jobs(project_id=project_id, limit=limit)}

    @app.get("/api/jobs/{job_id}/log")
    def get_job_log(job_id: str) -> dict[str, Any]:
        try:
            job = jobs.get_job(job_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Job not found") from exc
        return {"job": job, "log": jobs.read_log(job_id)}

    @app.post("/api/jobs/{job_id}/cancel")
    def cancel_job(job_id: str) -> dict[str, Any]:
        try:
            cancelled = jobs.cancel(job_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Job not found") from exc
        return {"cancelled": cancelled}

    @app.post("/api/jobs/{job_id}/retry")
    def retry_job(job_id: str) -> dict[str, Any]:
        try:
            job = jobs.get_job(job_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Job not found") from exc
        if job["status"] not in {"failed", "cancelled", "interrupted"}:
            raise HTTPException(
                status_code=400,
                detail="Only failed, cancelled, or interrupted jobs can be retried",
            )
        if job["job_type"] != "training":
            return {"new_job_id": jobs.retry(job_id)}
        command = json.loads(job["command_json"])
        try:
            checkpoint = command[command.index("--base_checkpoint") + 1]
            model_index = command.index("--model") + 1
            data_index = command.index("--data_path") + 1
            test_index = command.index("--test_npz_path") + 1
        except (ValueError, IndexError) as exc:
            raise HTTPException(
                status_code=400,
                detail="Training command is missing checkpoint/model/dataset arguments",
            ) from exc
        variant = infer_checkpoint_model(checkpoint)
        if not variant:
            raise HTTPException(
                status_code=400,
                detail="Cannot infer checkpoint architecture for retry",
            )
        command[model_index] = variant
        command, safety_changes = clamp_training_retry_command(
            command, str(job.get("gpu") or "")
        )
        requested_dataset = Path(command[data_index]).parent
        project = storage.get_project(job["project_id"])
        dataset = resolve_training_dataset(project, storage, requested_dataset)
        command[data_index] = str(dataset / "train")
        command[test_index] = str(dataset / "test.npz")
        project.training["dataset_path"] = str(dataset)
        storage.save_project(project)
        resume_point = Path(job.get("resume_point") or "")
        if resume_point.is_file() and "--resume" not in command:
            command += ["--resume", str(resume_point)]
        new_id = jobs.submit(
            "training",
            command,
            project_id=job["project_id"],
            cwd=job["cwd"],
            gpu=job["gpu"],
            env=json.loads(job["env_json"]),
            resume_point=job.get("resume_point"),
        )
        storage.replace_training_job(job["project_id"], job_id, new_id)
        return {
            "new_job_id": new_id,
            "architecture": variant,
            "safety_changes": safety_changes,
        }

    @app.get("/api/files")
    def serve_file(path: str = Query(...), v: str | None = Query(default=None)):
        resolved = _safe_resolve_under_root(path)
        media_type, _ = mimetypes.guess_type(str(resolved))
        cache_control = (
            "private, max-age=31536000, immutable"
            if v
            else "private, max-age=300"
        )
        return FileResponse(
            resolved,
            media_type=media_type,
            headers={"Cache-Control": cache_control},
        )

    if STATIC_DIR.is_dir():
        app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

    @app.get("/", response_class=HTMLResponse)
    def index():
        index_file = STATIC_DIR / "index.html"
        if not index_file.is_file():
            return HTMLResponse("<h1>zi2zi-JiT WebUI</h1><p>Static assets missing.</p>")
        return HTMLResponse(index_file.read_text(encoding="utf-8"))

    return app
