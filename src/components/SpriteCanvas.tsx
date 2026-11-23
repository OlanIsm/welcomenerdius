import { useEffect, useRef, useState } from "react";

interface FrameRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SpriteSheetData {
  frames: Record<string, { frame: FrameRect }>;
}

interface LoadedSheet {
  image: HTMLImageElement;
  frames: FrameRect[];
}

const spriteCache = new Map<string, Promise<LoadedSheet>>();
const resolvedCache = new Map<string, LoadedSheet>();

export function preloadSpriteSheet(
  jsonUrl: string,
  imageUrl: string
): Promise<LoadedSheet> {
  const cacheKey = `${jsonUrl}|${imageUrl}`;
  const existing = spriteCache.get(cacheKey);
  if (existing) return existing;

  const promise = (async () => {
    const [res, image] = await Promise.all([
      fetch(jsonUrl),
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (typeof img.decode === "function") {
            img.decode().then(() => resolve(img)).catch(() => resolve(img));
          } else {
            resolve(img);
          }
        };
        img.onerror = reject;
        img.src = imageUrl;
      }),
    ]);

    if (!res.ok || image.naturalWidth === 0) {
      throw new Error(`Failed to load sprite ${jsonUrl}`);
    }
    const data: SpriteSheetData = await res.json();
    const keys = Object.keys(data.frames).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
    const frames = keys.map((k) => data.frames[k].frame);
    const loaded: LoadedSheet = { image, frames };
    resolvedCache.set(cacheKey, loaded);
    return loaded;
  })().catch((err) => {
    spriteCache.delete(cacheKey);
    throw err;
  });

  spriteCache.set(cacheKey, promise);
  return promise;
}

interface SpriteCanvasProps {
  jsonUrl: string;
  imageUrl: string;
  fps?: number;
  alt: string;
  fallbackSrc?: string;
  active?: boolean;
  className?: string;
}

export function SpriteCanvas({
  jsonUrl,
  imageUrl,
  fps = 8,
  alt,
  fallbackSrc,
  active = true,
  className = "",
}: SpriteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cacheKey = `${jsonUrl}|${imageUrl}`;
  const [ready, setReady] = useState(() => resolvedCache.has(cacheKey));

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

    const effectiveFps = prefersReducedMotion ? Math.max(4, Math.floor(fps * 0.6)) : fps;

    const size = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    const startLoop = (sheet: LoadedSheet) => {
      if (cancelled || sheet.frames.length === 0) return;
      setReady(true);

      const start = performance.now();
      const drawFrame = (now: number) => {
        if (cancelled) return;
        // Clamp >= 0 because first rAF timestamp can precede performance.now(), which made Math.floor(-eps) % len === -1
        const elapsed = Math.max(0, (now - start) / 1000);
        const idx = !active
          ? 0
          : Math.floor(elapsed * effectiveFps) % sheet.frames.length;
        const f = sheet.frames[idx];
        if (!f) return;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, size, size);

        const scale = Math.min((size * 0.92) / f.w, (size * 0.92) / f.h);
        const drawW = f.w * scale;
        const drawH = f.h * scale;
        const drawX = (size - drawW) / 2;
        const drawY = (size - drawH) / 2;

        ctx.drawImage(sheet.image, f.x, f.y, f.w, f.h, drawX, drawY, drawW, drawH);

        if (active) {
          rafId = requestAnimationFrame(drawFrame);
        }
      };

      drawFrame(start);
    };

    const cached = resolvedCache.get(cacheKey);
    if (cached) {
      startLoop(cached);
    } else {
      setReady(false);
      preloadSpriteSheet(jsonUrl, imageUrl)
        .then(startLoop)
        .catch(() => {});
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [cacheKey, jsonUrl, imageUrl, fps, active]);

  return (
    <div className={`relative ${className}`}>
      {!ready && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          draggable={false}
          className="absolute inset-0 m-auto h-[72%] w-[72%] object-contain"
        />
      )}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className={`h-full w-full object-contain transition-opacity duration-200 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
