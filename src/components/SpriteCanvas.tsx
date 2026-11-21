import { useEffect, useRef } from "react";

interface FrameRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SpriteSheetData {
  frames: Record<string, { frame: FrameRect }>;
}

interface SpriteCanvasProps {
  jsonUrl: string;
  imageUrl: string;
  fps?: number;
  alt: string;
  className?: string;
}

export function SpriteCanvas({
  jsonUrl,
  imageUrl,
  fps = 8,
  alt,
  className = "",
}: SpriteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let rafId = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const load = async () => {
      try {
        const [res, img] = await Promise.all([
          fetch(jsonUrl),
          new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.decoding = "async";
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = imageUrl;
          }),
        ]);

        if (cancelled) return;
        const data: SpriteSheetData = await res.json();
        if (cancelled) return;

        const keys = Object.keys(data.frames).sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true })
        );
        const frames = keys.map((k) => data.frames[k].frame);
        if (frames.length === 0) return;

        const size = 420;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const start = performance.now();

        const drawFrame = (now: number) => {
          if (cancelled) return;
          const elapsed = (now - start) / 1000;
          const idx = prefersReducedMotion
            ? 0
            : Math.floor(elapsed * fps) % frames.length;
          const f = frames[idx];

          ctx.clearRect(0, 0, size, size);

          // Fit frame cleanly within square canvas preserving aspect ratio
          const scale = Math.min((size * 0.92) / f.w, (size * 0.92) / f.h);
          const drawW = f.w * scale;
          const drawH = f.h * scale;
          const drawX = (size - drawW) / 2;
          const drawY = (size - drawH) / 2;

          ctx.drawImage(img, f.x, f.y, f.w, f.h, drawX, drawY, drawW, drawH);

          if (!prefersReducedMotion) {
            rafId = requestAnimationFrame(drawFrame);
          }
        };

        rafId = requestAnimationFrame(drawFrame);
      } catch {
        // Ignore transient load cancellations on rapid character switching
      }
    };

    load();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [jsonUrl, imageUrl, fps]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={className}
    />
  );
}
