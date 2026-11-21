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

// Module-level cache so switching characters or toggling animations is instant (0ms)
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

    if (!res.ok) throw new Error(`Failed to fetch ${jsonUrl}`);
    const data: SpriteSheetData = await res.json();
    const keys = Object.keys(data.frames).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
    const frames = keys.map((k) => data.frames[k].frame);
    const loaded: LoadedSheet = { image, frames };
    resolvedCache.set(cacheKey, loaded);
    return loaded;
  })().catch((err) => {
    // Evict failed entry so retry works
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
  className?: string;
}

export function SpriteCanvas({
  jsonUrl,
  imageUrl,
  fps = 8,
  alt,
  fallbackSrc,
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

    const size = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const startLoop = (sheet: LoadedSheet) => {
      if (cancelled || sheet.frames.length === 0) return;
      setReady(true);

      const start = performance.now();
      const drawFrame = (now: number) => {
        if (cancelled) return;
        const elapsed = (now - start) / 1000;
        const idx = prefersReducedMotion
          ? 0
          : Math.floor(elapsed * fps) % sheet.frames.length;
        const f = sheet.frames[idx];

        ctx.clearRect(0, 0, size, size);

        const scale = Math.min((size * 0.92) / f.w, (size * 0.92) / f.h);
        const drawW = f.w * scale;
        const drawH = f.h * scale;
        const drawX = (size - drawW) / 2;
        const drawY = (size - drawH) / 2;

        ctx.drawImage(sheet.image, f.x, f.y, f.w, f.h, drawX, drawY, drawW, drawH);

        if (!prefersReducedMotion) {
          rafId = requestAnimationFrame(drawFrame);
        }
      };

      // Draw frame 0 immediately on the same tick (zero blank flash)
      drawFrame(start);
    };

    const cached = resolvedCache.get(cacheKey);
    if (cached) {
      startLoop(cached);
    } else {
      setReady(false);
      preloadSpriteSheet(jsonUrl, imageUrl)
        .then(startLoop)
        .catch(() => {
          /* fallback image remains visible */
        });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [cacheKey, jsonUrl, imageUrl, fps]);

  return (
    <div className={`relative ${className}`}>
      {!ready && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          draggable={false}
          className="absolute inset-0 m-auto h-[72%] w-[72%] object-contain opacity-90"
        />
      )}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className={`h-full w-full object-contain transition-opacity duration-150 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
