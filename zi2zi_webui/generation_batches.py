from __future__ import annotations

import json
import os
import re
import threading
import time
from collections import OrderedDict
from dataclasses import dataclass
from pathlib import Path
from typing import Sequence

from .font_builder import codepoint_from_filename


REGION_ORDER = ("SC", "TC", "JP", "KR")
_CANDIDATE_RE = re.compile(r"_c(\d{2})(?:_|$)", re.IGNORECASE)
_IMAGE_SUFFIXES = (".png", ".jpg", ".jpeg")
_SKIP_DIRS = frozenset({"compare", "pairs"})
_MAX_CACHE_ENTRIES = 32
_RACY_MTIME_WINDOW_NS = 50_000_000  # 50 ms guard against same-tick filesystem writes


@dataclass(frozen=True)
class GenerationBatch:
    path: Path
    batch_id: str
    status: str
    regions: tuple[str, ...]
    expected_count: int
    generated_count: int
    legacy: bool
    modified_ns: int


@dataclass
class _BatchScanIndex:
    is_request_batch: bool
    dir_mtimes: tuple[tuple[str, int, int], ...]
    by_region: dict[str, dict[int, tuple[Path, ...]]]
    all_by_codepoint: dict[int, tuple[Path, ...]]
    resolved_cache: dict[str, tuple[dict[int, Path], tuple[int, ...]]]


_CACHE_LOCK = threading.RLock()
_REQUEST_BATCH_CACHE: OrderedDict[
    Path, tuple[tuple[tuple[str, int, int], ...], GenerationBatch]
] = OrderedDict()
_BATCH_INDEX_CACHE: OrderedDict[Path, _BatchScanIndex] = OrderedDict()


def clear_batch_caches() -> None:
    """Clear in-memory generation batch metadata and scan caches."""
    with _CACHE_LOCK:
        _REQUEST_BATCH_CACHE.clear()
        _BATCH_INDEX_CACHE.clear()


def _candidate_index(path: Path) -> int:
    match = _CANDIDATE_RE.search(path.stem)
    return int(match.group(1)) if match else 0


def _scan_image_candidates(
    root: Path,
) -> tuple[list[Path], list[tuple[str, int, int]]]:
    """Walk ``root`` with ``os.scandir`` (zero per-file stat) and collect dir mtimes."""
    results: list[Path] = []
    dir_mtimes: list[tuple[str, int, int]] = []
    stack = [str(root)]
    while stack:
        current = stack.pop()
        try:
            dir_stat = os.stat(current)
            dir_mtimes.append((current, dir_stat.st_mtime_ns, dir_stat.st_ctime_ns))
            with os.scandir(current) as entries:
                for entry in entries:
                    name_lower = entry.name.lower()
                    try:
                        if entry.is_dir(follow_symlinks=False):
                            if name_lower not in _SKIP_DIRS:
                                stack.append(entry.path)
                            continue
                        if not entry.is_file(follow_symlinks=False):
                            continue
                    except OSError:
                        continue
                    if (
                        name_lower.endswith(_IMAGE_SUFFIXES)
                        and codepoint_from_filename(entry.name) is not None
                    ):
                        results.append(Path(entry.path))
        except OSError:
            continue
    return results, dir_mtimes


def _image_candidates(root: Path) -> list[Path]:
    paths, _ = _scan_image_candidates(root)
    return paths


def _safe_mtime_ns(path: Path) -> int:
    try:
        return path.stat().st_mtime_ns
    except OSError:
        return 0


def _pick_best_candidate(
    paths: Sequence[Path],
    *,
    prefer_candidate_index: bool = True,
) -> tuple[Path, bool]:
    """Return ``(chosen_path, used_file_mtime)`` with zero stat calls when unambiguous."""
    if len(paths) == 1:
        return paths[0], False
    if prefer_candidate_index:
        indexed = [(_candidate_index(path), path) for path in paths]
        min_idx = min(item[0] for item in indexed)
        tied = [path for idx, path in indexed if idx == min_idx]
        if len(tied) == 1:
            return tied[0], False
        chosen = min(
            tied,
            key=lambda path: (-_safe_mtime_ns(path), path.as_posix()),
        )
        return chosen, True
    chosen = max(paths, key=_safe_mtime_ns)
    return chosen, True


def _request_batch_signature(path: Path) -> tuple[tuple[str, int, int], ...]:
    plan_path = path / "generation-plan.json"
    plan_stat = plan_path.stat()
    entries: list[tuple[str, int, int]] = [
        ("generation-plan.json", plan_stat.st_mtime_ns, plan_stat.st_size)
    ]
    try:
        with os.scandir(path) as it:
            subdirs = sorted(
                (entry.name, entry.path)
                for entry in it
                if entry.is_dir(follow_symlinks=False)
            )
    except OSError:
        subdirs = []
    for name, subdir_path in subdirs:
        for filename in ("request.json", "generation-result.json"):
            candidate = os.path.join(subdir_path, filename)
            try:
                st = os.stat(candidate)
            except OSError:
                continue
            entries.append((f"{name}/{filename}", st.st_mtime_ns, st.st_size))
    return tuple(entries)


def _request_batch(path: Path) -> GenerationBatch:
    resolved = path.resolve()
    signature = _request_batch_signature(resolved)
    now_ns = time.time_ns()
    max_mtime_ns = max((item[1] for item in signature), default=0)
    allow_cache = abs(now_ns - max_mtime_ns) >= _RACY_MTIME_WINDOW_NS

    if allow_cache:
        with _CACHE_LOCK:
            cached = _REQUEST_BATCH_CACHE.get(resolved)
            if cached is not None and cached[0] == signature:
                _REQUEST_BATCH_CACHE.move_to_end(resolved)
                return cached[1]

    plan_path = resolved / "generation-plan.json"
    plan = json.loads(plan_path.read_text(encoding="utf-8"))
    requested_regions = tuple(str(item) for item in (plan.get("regions") or {}))
    regions = requested_regions or tuple(
        region for region in REGION_ORDER if (resolved / region).is_dir()
    )
    expected = 0
    generated = 0
    statuses = []
    candidates = max(int(plan.get("candidates", 1)), 1)
    modified_times = [plan_path.stat().st_mtime_ns]
    for region in regions:
        request_path = resolved / region / "request.json"
        result_path = resolved / region / "generation-result.json"
        try:
            request = json.loads(request_path.read_text(encoding="utf-8"))
            expected += int(request.get("count", 0)) * candidates
        except (OSError, ValueError, TypeError, json.JSONDecodeError):
            statuses.append("invalid")
            continue
        try:
            result_stat = result_path.stat()
            modified_times.append(result_stat.st_mtime_ns)
            result = json.loads(result_path.read_text(encoding="utf-8"))
            generated += int(result.get("generated_count", 0))
            statuses.append(str(result.get("status", "invalid")))
        except (OSError, ValueError, TypeError, json.JSONDecodeError):
            statuses.append("pending")
    status = (
        "succeeded"
        if regions
        and all(value == "succeeded" for value in statuses)
        and generated == expected
        else "incomplete"
    )
    batch = GenerationBatch(
        path=resolved,
        batch_id=str(plan.get("request_id") or resolved.name.removeprefix("request-")),
        status=status,
        regions=regions,
        expected_count=expected,
        generated_count=generated,
        legacy=False,
        modified_ns=max(modified_times),
    )
    with _CACHE_LOCK:
        _REQUEST_BATCH_CACHE[resolved] = (signature, batch)
        _REQUEST_BATCH_CACHE.move_to_end(resolved)
        while len(_REQUEST_BATCH_CACHE) > _MAX_CACHE_ENTRIES:
            _REQUEST_BATCH_CACHE.popitem(last=False)
    return batch


def list_generation_batches(root: str | Path) -> list[GenerationBatch]:
    root = Path(root)
    if not root.is_dir():
        return []
    batches = []
    claimed_roots: set[Path] = set()
    for path in root.glob("request-*"):
        if not path.is_dir() or not (path / "generation-plan.json").is_file():
            continue
        try:
            batches.append(_request_batch(path))
            claimed_roots.add(path.resolve())
        except (OSError, ValueError, TypeError, json.JSONDecodeError):
            continue
    for path in root.iterdir():
        if not path.is_dir() or path.resolve() in claimed_roots:
            continue
        images = _image_candidates(path)
        if not images:
            continue
        batches.append(
            GenerationBatch(
                path=path.resolve(),
                batch_id=path.name,
                status="legacy",
                regions=(),
                expected_count=len(images),
                generated_count=len(images),
                legacy=True,
                modified_ns=max(_safe_mtime_ns(item) for item in images),
            )
        )
    return sorted(batches, key=lambda item: item.modified_ns, reverse=True)


def preferred_generation_batch(
    batches: list[GenerationBatch],
) -> GenerationBatch | None:
    return next(
        (batch for batch in batches if batch.status == "succeeded"),
        batches[0] if batches else None,
    )


def batch_choices(
    root: str | Path,
) -> tuple[list[tuple[str, str]], str | None]:
    batches = list_generation_batches(root)
    choices = [
        (
            (
                f"{batch.batch_id} · {batch.status} · "
                f"{batch.generated_count}/{batch.expected_count}"
            ),
            str(batch.path),
        )
        for batch in batches
    ]
    preferred = preferred_generation_batch(batches)
    return choices, str(preferred.path) if preferred else None


def validate_batch_path(root: str | Path, selected: str | Path) -> Path:
    root = Path(root).resolve()
    selected = Path(selected).resolve()
    if (
        selected.parent == root
        and selected.name.startswith("request-")
        and (selected / "generation-plan.json").is_file()
    ):
        try:
            return _request_batch(selected).path
        except (OSError, ValueError, TypeError, json.JSONDecodeError):
            pass
    allowed = {batch.path for batch in list_generation_batches(root)}
    if selected not in allowed:
        raise ValueError("The selected generation batch is unavailable")
    return selected


def load_and_prune_selections(path: str | Path) -> dict[str, str]:
    path = Path(path)
    if not path.is_file():
        return {}
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError, TypeError, json.JSONDecodeError) as exc:
        raise ValueError(f"Invalid glyph selection manifest: {exc}") from exc
    cleaned = {
        str(label): str(image_path)
        for label, image_path in raw.items()
        if isinstance(label, str)
        and isinstance(image_path, str)
        and Path(image_path).is_file()
    }
    if cleaned != raw:
        path.write_text(
            json.dumps(cleaned, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
    return cleaned


def _preferred_region_order(primary_region: str) -> tuple[str, ...]:
    return tuple(dict.fromkeys([primary_region, *REGION_ORDER]))


def _is_index_fresh(index: _BatchScanIndex) -> bool:
    if not index.dir_mtimes:
        return False
    now_ns = time.time_ns()
    for dir_path, mtime_ns, ctime_ns in index.dir_mtimes:
        if abs(now_ns - mtime_ns) < _RACY_MTIME_WINDOW_NS:
            return False
        try:
            st = os.stat(dir_path)
        except OSError:
            return False
        if st.st_mtime_ns != mtime_ns or st.st_ctime_ns != ctime_ns:
            return False
    return True


def _get_batch_scan_index(batch: Path) -> _BatchScanIndex:
    resolved = batch.resolve()
    with _CACHE_LOCK:
        cached = _BATCH_INDEX_CACHE.get(resolved)
        if cached is not None and _is_index_fresh(cached):
            _BATCH_INDEX_CACHE.move_to_end(resolved)
            return cached

    plan_path = resolved / "generation-plan.json"
    is_request_batch = plan_path.is_file()
    dir_mtimes: list[tuple[str, int, int]] = []
    by_region: dict[str, dict[int, tuple[Path, ...]]] = {}
    all_grouped: dict[int, list[Path]] = {}

    if is_request_batch:
        try:
            root_stat = os.stat(resolved)
            dir_mtimes.append((str(resolved), root_stat.st_mtime_ns, root_stat.st_ctime_ns))
        except OSError:
            pass
        try:
            with os.scandir(resolved) as entries:
                subdirs = sorted(
                    (entry.name, Path(entry.path))
                    for entry in entries
                    if entry.is_dir(follow_symlinks=False)
                    and entry.name.lower() not in _SKIP_DIRS
                )
        except OSError:
            subdirs = []
        for region_name, region_root in subdirs:
            paths, region_dirs = _scan_image_candidates(region_root)
            dir_mtimes.extend(region_dirs)
            grouped: dict[int, list[Path]] = {}
            for path in paths:
                codepoint = codepoint_from_filename(path.name)
                if codepoint is not None:
                    grouped.setdefault(codepoint, []).append(path)
                    all_grouped.setdefault(codepoint, []).append(path)
            if grouped:
                by_region[region_name] = {
                    cp: tuple(items) for cp, items in grouped.items()
                }
    else:
        paths, legacy_dirs = _scan_image_candidates(resolved)
        dir_mtimes.extend(legacy_dirs)
        for path in paths:
            codepoint = codepoint_from_filename(path.name)
            if codepoint is not None:
                all_grouped.setdefault(codepoint, []).append(path)

    all_by_codepoint = {cp: tuple(items) for cp, items in all_grouped.items()}
    # Deduplicate directory mtime records while keeping deterministic order
    seen_dirs: set[str] = set()
    unique_dir_mtimes: list[tuple[str, int, int]] = []
    for item in dir_mtimes:
        if item[0] not in seen_dirs:
            seen_dirs.add(item[0])
            unique_dir_mtimes.append(item)

    index = _BatchScanIndex(
        is_request_batch=is_request_batch,
        dir_mtimes=tuple(unique_dir_mtimes),
        by_region=by_region,
        all_by_codepoint=all_by_codepoint,
        resolved_cache={},
    )
    with _CACHE_LOCK:
        _BATCH_INDEX_CACHE[resolved] = index
        _BATCH_INDEX_CACHE.move_to_end(resolved)
        while len(_BATCH_INDEX_CACHE) > _MAX_CACHE_ENTRIES:
            _BATCH_INDEX_CACHE.popitem(last=False)
    return index


def _resolve_default_glyphs(
    index: _BatchScanIndex,
    primary_region: str,
) -> tuple[dict[int, Path], tuple[int, ...]]:
    cache_key = primary_region if index.is_request_batch else ""
    with _CACHE_LOCK:
        cached = index.resolved_cache.get(cache_key)
        if cached is not None:
            return cached

    result: dict[int, Path] = {}
    used_file_mtime = False
    if index.is_request_batch:
        for region in _preferred_region_order(primary_region):
            grouped = index.by_region.get(region)
            if not grouped:
                continue
            for codepoint, paths in grouped.items():
                if codepoint in result:
                    continue
                chosen, used_mtime = _pick_best_candidate(
                    paths, prefer_candidate_index=True
                )
                if used_mtime:
                    used_file_mtime = True
                result[codepoint] = chosen
    else:
        for codepoint, paths in index.all_by_codepoint.items():
            chosen, used_mtime = _pick_best_candidate(
                paths, prefer_candidate_index=False
            )
            if used_mtime:
                used_file_mtime = True
            result[codepoint] = chosen

    sorted_codepoints = tuple(sorted(result))
    resolved_pair = (result, sorted_codepoints)
    # Only cache resolved winners when independent of individual file mtimes
    if not used_file_mtime:
        with _CACHE_LOCK:
            index.resolved_cache[cache_key] = resolved_pair
    return resolved_pair


def scan_generation_batch(
    batch_path: str | Path,
    *,
    primary_region: str = "SC",
    selections: dict[str, str] | None = None,
) -> dict[int, Path]:
    batch = Path(batch_path).resolve()
    index = _get_batch_scan_index(batch)
    base_glyphs, _ = _resolve_default_glyphs(index, primary_region)
    result = dict(base_glyphs)

    for label, selected_path in (selections or {}).items():
        try:
            codepoint = int(label.removeprefix("U+"), 16)
        except ValueError:
            continue
        candidate = Path(selected_path).resolve()
        if candidate.is_file() and batch in candidate.parents:
            result[codepoint] = candidate
    return result


def review_page_details(
    batch_path: str | Path,
    *,
    search: str = "",
    page: int = 1,
    page_size: int = 100,
    primary_region: str = "SC",
) -> tuple[list[Path], list[int], int, int, int]:
    batch = Path(batch_path).resolve()
    index = _get_batch_scan_index(batch)
    glyphs, all_codepoints = _resolve_default_glyphs(index, primary_region)
    query = search.strip().upper().removeprefix("U+")
    if query:
        codepoints: Sequence[int] = [
            codepoint
            for codepoint in all_codepoints
            if query in f"{codepoint:04X}" or search in chr(codepoint)
        ]
    else:
        codepoints = all_codepoints
    total_items = len(codepoints)
    total_pages = max((total_items + page_size - 1) // page_size, 1)
    page = min(max(int(page), 1), total_pages)
    start = (page - 1) * page_size
    selected = list(codepoints[start : start + page_size])
    return [glyphs[codepoint] for codepoint in selected], selected, page, total_pages, total_items


def review_page(
    batch_path: str | Path,
    *,
    search: str = "",
    page: int = 1,
    page_size: int = 100,
    primary_region: str = "SC",
) -> tuple[list[Path], list[int], int, int]:
    images, selected, current_page, total_pages, _total = review_page_details(
        batch_path,
        search=search,
        page=page,
        page_size=page_size,
        primary_region=primary_region,
    )
    return images, selected, current_page, total_pages


def candidates_for_codepoint(
    batch_path: str | Path,
    codepoint: int,
) -> list[Path]:
    batch = Path(batch_path).resolve()
    index = _get_batch_scan_index(batch)
    paths = list(index.all_by_codepoint.get(int(codepoint), ()))
    if len(paths) <= 1:
        return paths
    return sorted(
        paths,
        key=lambda path: (
            _candidate_index(path),
            -_safe_mtime_ns(path),
            path.as_posix(),
        ),
    )
