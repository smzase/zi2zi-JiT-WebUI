FROM pytorch/pytorch:2.5.1-cuda12.1-cudnn9-runtime

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONUTF8=1 \
    PYTHONIOENCODING=utf-8 \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    MPLBACKEND=Agg \
    ZI2ZI_TORCH_COMPILE=auto

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       git gcc g++ libc6-dev libgl1 libglib2.0-0 fontconfig \
    && rm -rf /var/lib/apt/lists/*

RUN pip install \
      "setuptools<81" \
      opencv-python-headless==4.11.0.86 \
      timm==0.9.12 "tensorboard>=2.10,<3" "scipy>=1.10,<2" einops==0.8.1 \
      gdown==5.2.0 fonttools "Pillow<12" pytorch-msssim lpips tqdm matplotlib \
      fastapi uvicorn python-multipart "pydantic<2.11" "pandas<2.3" psutil nvidia-ml-py vtracer==0.6.15 \
    && pip install "git+https://github.com/LTH14/torch-fidelity.git@master"

COPY . /app

RUN pip install --no-deps --no-build-isolation -e . \
    && mkdir -p /data

EXPOSE 7860 6006

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:7860/api/health', timeout=3)" || exit 1

CMD ["python", "webui.py", "--host", "0.0.0.0", "--port", "7860", "--data-dir", "/data", "--tensorboard-port", "6006"]
