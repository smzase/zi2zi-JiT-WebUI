#!/usr/bin/env python3
from __future__ import annotations

import argparse
import atexit
import os
import subprocess
import sys
from pathlib import Path

os.environ.setdefault("MPLBACKEND", "Agg")

import uvicorn

from zi2zi_webui.app import build_app
from zi2zi_webui.jobs import JobManager
from zi2zi_webui.storage import Storage


def get_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="zi2zi-JiT local font-production WebUI")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=7860)
    parser.add_argument("--data-dir", default="webui_data")
    parser.add_argument("--language", choices=["auto", "zh", "en"], default="auto")
    parser.add_argument("--tensorboard-port", type=int, default=6006)
    parser.add_argument(
        "--tensorboard-url",
        default=None,
        help="Public TensorBoard URL shown in the WebUI (defaults to ZI2ZI_TENSORBOARD_URL or http://127.0.0.1:<tensorboard-port>)",
    )
    parser.add_argument("--no-tensorboard", action="store_true")
    parser.add_argument(
        "--share",
        action="store_true",
        help="Deprecated option kept for CLI compatibility",
    )
    return parser


def resolve_tensorboard_url(tensorboard_port: int, tensorboard_url: str | None = None) -> str:
    raw = tensorboard_url if tensorboard_url is not None else os.environ.get("ZI2ZI_TENSORBOARD_URL", "")
    cleaned = raw.strip().rstrip("/")
    return cleaned or f"http://127.0.0.1:{tensorboard_port}"


def main() -> None:
    args = get_parser().parse_args()
    language = "zh" if args.language == "auto" else args.language
    storage = Storage(args.data_dir)
    jobs = JobManager(storage)
    atexit.register(jobs.stop)

    tensorboard = None
    tensorboard_url = resolve_tensorboard_url(args.tensorboard_port, args.tensorboard_url)
    tensorboard_host = "0.0.0.0" if args.host == "0.0.0.0" else "127.0.0.1"
    if not args.no_tensorboard:
        command = [
            sys.executable,
            "-m",
            "tensorboard.main",
            "--logdir",
            str(storage.projects_dir),
            "--host",
            tensorboard_host,
            "--port",
            str(args.tensorboard_port),
        ]
        try:
            tensorboard = subprocess.Popen(
                command,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            atexit.register(tensorboard.terminate)
        except OSError:
            tensorboard = None

    app = build_app(
        storage,
        jobs,
        language=language,
        tensorboard_url=tensorboard_url,
    )
    print(f"zi2zi-JiT Font Studio running at http://{args.host}:{args.port}", flush=True)
    if args.share:
        print("Notice: --share is ignored by the FastAPI WebUI.", flush=True)
    uvicorn.run(
        app,
        host=args.host,
        port=args.port,
        log_level="info",
    )


if __name__ == "__main__":
    main()
