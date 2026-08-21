"""Build a 10s seamless looping 16:9 hero video from the boutique still."""

from __future__ import annotations

import math
from pathlib import Path

import imageio.v2 as imageio
import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\Dhivakar\.cursor\projects\c-Users-Dhivakar-OneDrive-Desktop-E-commerce\assets\hero-frame-01.png"
)
OUT = Path(r"C:\Users\Dhivakar\OneDrive\Desktop\E commerce\public\videos\hero-fashion.mp4")

DURATION = 10.0
FPS = 24
FRAME_COUNT = int(DURATION * FPS)
BLEND_SECONDS = 1.0
BLEND_FRAMES = int(BLEND_SECONDS * FPS)
OUT_W, OUT_H = 1920, 1080
ASPECT = OUT_W / OUT_H


def ease_cos(t: float) -> float:
    """Closed loop: 0 at t=0 and t=1."""
    return 0.5 * (1.0 - math.cos(2.0 * math.pi * t))


def crop_window(src_w: int, src_h: int, t: float) -> tuple[float, float, float, float]:
    """Return (left, top, width, height) in source pixels. Period 1, start==end."""
    # Base window slightly tighter than full 16:9 so the camera can drift.
    max_h = src_w / ASPECT
    if max_h > src_h:
        base_h = src_h * 0.92
        base_w = base_h * ASPECT
    else:
        base_w = src_w * 0.94
        base_h = base_w / ASPECT

    # Subtle forward zoom in the middle of the loop, returns at the end.
    zoom = 1.0 + 0.045 * ease_cos(t)
    crop_w = base_w / zoom
    crop_h = base_h / zoom

    extra_x = src_w - crop_w
    extra_y = src_h - crop_h

    # Left -> right drift that returns (gentle sine). Bias right so couple stays in frame
    # and left third remains usable for hero text.
    pan_x = 0.22 + 0.62 * (0.5 + 0.5 * math.sin(2.0 * math.pi * t))
    pan_y = 0.42 + 0.10 * math.sin(2.0 * math.pi * t)

    left = extra_x * pan_x
    top = extra_y * pan_y
    left = min(max(left, 0.0), extra_x)
    top = min(max(top, 0.0), extra_y)
    return left, top, crop_w, crop_h


def extract_frame(src: Image.Image, t: float) -> Image.Image:
    left, top, crop_w, crop_h = crop_window(src.width, src.height, t)
    # High-quality subpixel crop via perspective-free affine resample.
    src_pts = [
        left,
        top,
        left + crop_w,
        top,
        left + crop_w,
        top + crop_h,
        left,
        top + crop_h,
    ]
    dst_pts = [0, 0, OUT_W, 0, OUT_W, OUT_H, 0, OUT_H]
    coeffs = _find_coeffs(dst_pts, src_pts)
    return src.transform(
        (OUT_W, OUT_H),
        Image.Transform.PERSPECTIVE,
        coeffs,
        resample=Image.Resampling.LANCZOS,
    )


def _find_coeffs(dst, src):
    matrix = []
    for i in range(4):
        dx, dy = dst[2 * i], dst[2 * i + 1]
        sx, sy = src[2 * i], src[2 * i + 1]
        matrix.append([dx, dy, 1, 0, 0, 0, -sx * dx, -sx * dy])
        matrix.append([0, 0, 0, dx, dy, 1, -sy * dx, -sy * dy])
    a = np.array(matrix, dtype=np.float64)
    b = np.array(src, dtype=np.float64)
    return np.linalg.solve(a, b).tolist()


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    src = Image.open(SRC).convert("RGB")

    frames: list[np.ndarray] = []
    for i in range(FRAME_COUNT):
        t = i / FRAME_COUNT
        frame = extract_frame(src, t)
        frames.append(np.asarray(frame, dtype=np.float32))

    # Crossfade the last 1s into the first 1s so restart has no visible jump.
    for j in range(BLEND_FRAMES):
        alpha = (j + 1) / BLEND_FRAMES
        idx = FRAME_COUNT - BLEND_FRAMES + j
        frames[idx] = (1.0 - alpha) * frames[idx] + alpha * frames[j]

    writer = imageio.get_writer(
        OUT.as_posix(),
        fps=FPS,
        codec="libx264",
        ffmpeg_params=[
            "-pix_fmt",
            "yuv420p",
            "-crf",
            "16",
            "-preset",
            "slow",
            "-movflags",
            "+faststart",
            "-tune",
            "film",
        ],
    )
    try:
        for arr in frames:
            writer.append_data(np.clip(arr, 0, 255).astype(np.uint8))
    finally:
        writer.close()

    size_mb = OUT.stat().st_size / (1024 * 1024)
    print(f"Wrote {OUT} ({size_mb:.1f} MB, {FRAME_COUNT} frames, {FPS} fps)")


if __name__ == "__main__":
    main()
