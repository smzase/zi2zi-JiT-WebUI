import json
import re
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from zi2zi_webui.app import build_app, training_snapshot_items
from zi2zi_webui.jobs import JobManager
from zi2zi_webui.models import TrainingRun
from zi2zi_webui.storage import Storage

EMOJI_RE = re.compile(
    "["
    "\U0001F300-\U0001F9FF"
    "\U0001FA00-\U0001FAFF"
    "\U00002600-\U000027BF"
    "]"
)


def test_build_app_serves_flat_ui_without_emoji(tmp_path):
    storage = Storage(tmp_path)
    jobs = JobManager(storage)
    try:
        app = build_app(storage, jobs, language="zh")
        client = TestClient(app)

        health = client.get("/api/health")
        assert health.status_code == 200
        assert health.json()["status"] == "ok"

        html_resp = client.get("/")
        assert html_resp.status_code == 200
        assert "zi2zi-JiT" in html_resp.text
        assert "uiModeSwitcher" in html_resp.text
        assert 'data-ui-mode="simple"' in html_resp.text
        assert 'data-ui-mode="advanced"' in html_resp.text
        assert not EMOJI_RE.search(html_resp.text)

        css_resp = client.get("/static/styles.css")
        assert css_resp.status_code == 200
        assert "#ffffff" in css_resp.text.lower()
        assert "#191a1b" in css_resp.text.lower()
        assert not EMOJI_RE.search(css_resp.text)

        js_resp = client.get("/static/app.js")
        assert js_resp.status_code == 200
        assert not EMOJI_RE.search(js_resp.text)
    finally:
        jobs.stop()


def test_training_snapshot_items_formats_caption_and_keeps_latest_first(tmp_path):
    snap_dir_1 = tmp_path / "epoch_0"
    snap_dir_2 = tmp_path / "epoch_1"
    snap_dir_1.mkdir()
    snap_dir_2.mkdir()
    first = snap_dir_1 / "eval_0.png"
    second = snap_dir_2 / "eval_1.png"
    first.write_bytes(b"png1")
    second.write_bytes(b"png2")

    items = training_snapshot_items(
        [
            (
                "run001",
                [
                    {"phase": "evaluation", "epoch": 0, "snapshot_path": str(snap_dir_1)},
                    {"phase": "evaluation", "epoch": 1, "snapshot_path": str(snap_dir_2)},
                    {
                        "phase": "evaluation",
                        "epoch": 2,
                        "snapshot_path": str(tmp_path / "missing_dir"),
                    },
                ],
            )
        ],
        language="zh",
    )

    assert [path for path, _ in items] == [str(first), str(second)]
    assert "Run run001" in items[0][1]
    assert "第 1 轮" in items[0][1]
    assert "第 2 轮" in items[1][1]


def test_training_snapshot_items_supports_fallback_caption_without_metrics(tmp_path):
    snap_dir = tmp_path / "epoch_0"
    snap_dir.mkdir()
    snap = snap_dir / "custom.png"
    snap.write_bytes(b"png")
    items = training_snapshot_items(
        [("run002", [{"phase": "evaluation", "epoch": 0, "snapshot_path": str(snap_dir)}])],
        language="en",
    )
    assert len(items) == 1
    assert items[0][0] == str(snap)
    assert "Epoch 1" in items[0][1]
    assert "Group 1" in items[0][1]


def test_project_crud_and_bootstrap(tmp_path):
    storage = Storage(tmp_path)
    jobs = JobManager(storage)
    try:
        app = build_app(storage, jobs, language="en")
        client = TestClient(app)

        boot = client.get("/api/bootstrap?lang=en")
        assert boot.status_code == 200
        boot_data = boot.json()
        assert isinstance(boot_data["devices"], list)
        assert isinstance(boot_data["presets"], list)
        assert all(p["id"] not in {"ja-joyo", "ja-kana"} for p in boot_data["presets"])

        created = client.post("/api/projects", json={"name": "DemoFont"})
        assert created.status_code == 200
        pid = created.json()["project"]["id"]

        detail = client.get(f"/api/projects/{pid}")
        assert detail.status_code == 200
        assert detail.json()["manifest"]["name"] == "DemoFont"

        # Deletion requires explicit confirmation
        denied = client.request("DELETE", f"/api/projects/{pid}", json={"confirmed": False})
        assert denied.status_code == 400

        deleted = client.request("DELETE", f"/api/projects/{pid}", json={"confirmed": True})
        assert deleted.status_code == 200
        with pytest.raises(KeyError):
            storage.get_project(pid)
    finally:
        jobs.stop()


def test_dataset_presets_and_file_sandbox(tmp_path):
    storage = Storage(tmp_path)
    jobs = JobManager(storage)
    try:
        app = build_app(storage, jobs, language="en")
        client = TestClient(app)

        for name, expected_train in [("quick", 500), ("balanced", 3000), ("coverage", 6000)]:
            resp = client.get(f"/api/dataset/preset/{name}")
            assert resp.status_code == 200
            assert resp.json()["train_count"] == expected_train

        # Files inside storage.root are served; outside paths are rejected
        inside = tmp_path / "sample.txt"
        inside.write_text("hello", encoding="utf-8")
        ok = client.get("/api/files", params={"path": str(inside)})
        assert ok.status_code == 200
        assert ok.text == "hello"

        outside = tmp_path.parent / "secret_outside.txt"
        outside.write_text("nope", encoding="utf-8")
        try:
            blocked = client.get("/api/files", params={"path": str(outside)})
            assert blocked.status_code == 403
        finally:
            outside.unlink(missing_ok=True)
    finally:
        jobs.stop()


def test_review_selection_and_training_dashboard_endpoints(tmp_path):
    storage = Storage(tmp_path)
    jobs = JobManager(storage)
    try:
        project = storage.create_project("ReviewProj")
        pdir = storage.project_dir(project.id)
        batch_dir = pdir / "generation" / "batch_001"
        batch_dir.mkdir(parents=True, exist_ok=True)
        (batch_dir / "U+4E00_c0.png").write_bytes(b"png0")
        (batch_dir / "U+4E00_c1.png").write_bytes(b"png1")

        run_dir = pdir / "training" / "run-001"
        run_dir.mkdir(parents=True, exist_ok=True)
        metrics_path = run_dir / "metrics.jsonl"
        metrics_path.write_text(
            json.dumps(
                {
                    "phase": "train",
                    "global_step": 10,
                    "step": 10,
                    "epoch": 1,
                    "loss": 0.5,
                    "lr": 0.0001,
                    "gpu_memory_allocated_gb": 4.2,
                }
            )
            + "\n",
            encoding="utf-8",
        )
        storage.save_training_run(
            TrainingRun(
                id="run-001",
                project_id=project.id,
                status="completed",
                parameters={"epochs": 10, "batch_size": 4, "lr": 1e-4},
                metrics_path=str(metrics_path),
            )
        )

        app = build_app(storage, jobs, language="en")
        client = TestClient(app)

        page = client.get(
            f"/api/projects/{project.id}/review/page",
            params={"batch_path": str(batch_dir), "page": 1},
        )
        assert page.status_code == 200
        assert len(page.json()["items"]) == 1
        assert page.json()["items"][0]["codepoint"] == "U+4E00"

        cand = client.get(
            f"/api/projects/{project.id}/review/candidates",
            params={"batch_path": str(batch_dir), "codepoint": "U+4E00"},
        )
        assert cand.status_code == 200
        assert len(cand.json()["candidates"]) == 2

        sel = client.post(
            f"/api/projects/{project.id}/review/select",
            json={
                "batch_path": str(batch_dir),
                "codepoint": "U+4E00",
                "image_path": str(batch_dir / "U+4E00_c1.png"),
            },
        )
        assert sel.status_code == 200

        dash = client.post(
            f"/api/projects/{project.id}/training/dashboard",
            json={"run_ids": ["run-001"], "language": "en"},
        )
        assert dash.status_code == 200
        dash_data = dash.json()
        assert len(dash_data["series"]["loss"]) == 1
        assert dash_data["series"]["loss"][0]["points"][0]["y"] == 0.5

        del_denied = client.delete(
            f"/api/projects/{project.id}/training/runs/run-001",
            params={"confirmed": False},
        )
        assert del_denied.status_code == 400
    finally:
        jobs.stop()


def test_resolve_tensorboard_url_precedence(monkeypatch):
    from webui import get_parser, resolve_tensorboard_url

    monkeypatch.delenv("ZI2ZI_TENSORBOARD_URL", raising=False)
    assert resolve_tensorboard_url(6006) == "http://127.0.0.1:6006"

    monkeypatch.setenv("ZI2ZI_TENSORBOARD_URL", "http://127.0.0.1:16006/")
    assert resolve_tensorboard_url(6006) == "http://127.0.0.1:16006"

    assert (
        resolve_tensorboard_url(6006, "http://192.168.1.10:6007/")
        == "http://192.168.1.10:6007"
    )

    parsed = get_parser().parse_args(["--tensorboard-url", "http://example.local:6006/"])
    assert resolve_tensorboard_url(parsed.tensorboard_port, parsed.tensorboard_url) == (
        "http://example.local:6006"
    )


def test_export_artifacts_svg_sampling_cache_headers_and_specimen_url(tmp_path):
    storage = Storage(tmp_path)
    jobs = JobManager(storage)
    try:
        project = storage.create_project("ExportPerfProj")
        pdir = storage.project_dir(project.id)
        fonts_dir = pdir / "fonts"
        fonts_dir.mkdir(parents=True, exist_ok=True)
        ttf_path = fonts_dir / "Demo-Text-1.000.ttf"
        ttf_path.write_bytes(b"fake-ttf")
        svg_dir = fonts_dir / "Demo-Text-1.000" / "svg"
        svg_dir.mkdir(parents=True, exist_ok=True)
        for index in range(120):
            (svg_dir / f"U+{0x4E00 + index:04X}.svg").write_text(
                "<svg xmlns='http://www.w3.org/2000/svg'/>", encoding="utf-8"
            )

        app = build_app(storage, jobs, language="en")
        client = TestClient(app)

        resp = client.get(
            f"/api/projects/{project.id}/export/artifacts",
            params={"svg_limit": 24},
        )
        assert resp.status_code == 200
        payload = resp.json()
        assert payload["svg_total"] == 120
        assert len(payload["svgs"]) == 24
        assert payload["preview_font_name"] == "Demo-Text-1.000.ttf"
        assert payload["preview_font_version"]

        # Unversioned and versioned /api/files URLs both succeed with Cache-Control headers
        preview_url = payload["preview_font_url"]
        r_plain = client.get(preview_url)
        assert r_plain.status_code == 200
        assert "max-age=300" in r_plain.headers.get("cache-control", "")

        version = payload["preview_font_version"]
        r_ver = client.get(f"{preview_url}&v={version}")
        assert r_ver.status_code == 200
        assert "immutable" in r_ver.headers.get("cache-control", "")

        # Ensure frontend does not regress to broken `?t=` query concatenation on `/api/files?path=...`
        js_text = client.get("/static/app.js").text
        assert "${url}?t=" not in js_text
    finally:
        jobs.stop()
