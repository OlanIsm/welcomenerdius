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

interface LoadedSprite {
  image: HTMLImageElement;
  frames: FrameRect[];
}

interface ParallaxLayerConfig {
  id: number;
  src: string;
  /** Scroll speed in px/sec at a 900px reference height */
  speed: number;
  /** Mouse sway multiplier in px */
  sway: number;
  /** Draw in front of the characters */
  foreground?: boolean;
}

const PARALLAX_LAYERS: ParallaxLayerConfig[] = [
  { id: 1, src: "/assets/savannah/1.webp", speed: 4, sway: 2 },
  { id: 2, src: "/assets/savannah/2.webp", speed: 10, sway: 4 },
  { id: 3, src: "/assets/savannah/3.webp", speed: 16, sway: 6 },
  { id: 4, src: "/assets/savannah/4.webp", speed: 24, sway: 8 },
  { id: 5, src: "/assets/savannah/5.webp", speed: 38, sway: 11 },
  { id: 6, src: "/assets/savannah/6.webp", speed: 52, sway: 14 },
  { id: 7, src: "/assets/savannah/7.webp", speed: 96, sway: 18 },
  { id: 8, src: "/assets/savannah/8.webp", speed: 102, sway: 20 },
  { id: 9, src: "/assets/savannah/9.webp", speed: 112, sway: 22 },
  { id: 10, src: "/assets/savannah/10.webp", speed: 142, sway: 28, foreground: true },
  { id: 11, src: "/assets/savannah/11.webp", speed: 195, sway: 36, foreground: true },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadSpriteSheet(
  jsonUrl: string,
  imageUrl: string
): Promise<LoadedSprite> {
  const [res, image] = await Promise.all([fetch(jsonUrl), loadImage(imageUrl)]);
  const data: SpriteSheetData = await res.json();
  const sortedKeys = Object.keys(data.frames).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
  const frames = sortedKeys.map((key) => data.frames[key].frame);
  return { image, frames };
}

export function SavannahParallaxCanvas() {
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

    const layerImages: (HTMLImageElement | null)[] = new Array(
      PARALLAX_LAYERS.length
    ).fill(null);
    let mcSprite: LoadedSprite | null = null;
    let nerdSprite: LoadedSprite | null = null;

    // Load all 11 parallax layers independently so they appear immediately as ready
    PARALLAX_LAYERS.forEach((layer, idx) => {
      loadImage(layer.src)
        .then((img) => {
          if (!cancelled) layerImages[idx] = img;
        })
        .catch(() => {
          /* ignore single layer failure */
        });
    });

    // Load MC walk and Nerd idle spritesheets
    loadSpriteSheet(
      "/assets/characters/mc-walk/spritesheet.json",
      "/assets/characters/mc-walk/spritesheet.png"
    )
      .then((sprite) => {
        if (!cancelled) mcSprite = sprite;
      })
      .catch(() => {});

    loadSpriteSheet(
      "/assets/characters/nerd-well-actually/spritesheet.json",
      "/assets/characters/nerd-well-actually/spritesheet.png"
    )
      .then((sprite) => {
        if (!cancelled) nerdSprite = sprite;
      })
      .catch(() => {});

    // Resize canvas cleanly with devicePixelRatio
    let width = 0;
    let height = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Subtle pointer sway for soothing depth
    let targetPointerX = 0;
    let currentPointerX = 0;
    const onPointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || width <= 0) return;
      targetPointerX = (e.clientX / width - 0.5) * 2; // -1 to 1
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let elapsed = 0;
    let lastTime = performance.now();

    const drawTiledLayer = (
      img: HTMLImageElement,
      offsetPx: number,
      drawY: number,
      tileW: number,
      tileH: number
    ) => {
      // Positive offsetPx scrolls left-to-right so left-facing characters appear to walk right-to-left
      const wrapped = ((offsetPx % tileW) + tileW) % tileW;
      let x = wrapped - tileW;
      while (x < width + tileW) {
        ctx.drawImage(img, x, drawY, tileW + 1, tileH);
        x += tileW;
      }
    };

    const drawCharacters = (timeSec: number, drawY: number, tileH: number) => {
      // Ground sandy path sits around 71.5% down the parallax canvas
      const groundY = drawY + tileH * 0.72;
      const isCompact = width < 768;

      // Position characters on the right-center (Cobblemon composition)
      const mcCenterX = isCompact ? width * 0.54 : width * 0.69;
      const mcSize = Math.max(148, Math.min(tileH * 0.3, width * 0.36, 295));
      const strideBob = prefersReducedMotion
        ? 0
        : Math.abs(Math.sin(timeSec * Math.PI * 2.5)) * -4.5;

      // Soft contact shadow under MC
      ctx.save();
      ctx.fillStyle = "rgba(38, 62, 34, 0.24)";
      const mcShadowScale = 1 - Math.abs(strideBob) * 0.018;
      ctx.beginPath();
      ctx.ellipse(
        mcCenterX,
        groundY + 2,
        mcSize * 0.24 * mcShadowScale,
        mcSize * 0.055 * mcShadowScale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();

      // Draw MC walking right-to-left (horizontally flipped)
      if (mcSprite && mcSprite.frames.length > 0) {
        const fps = 9.5;
        const frameIdx = prefersReducedMotion
          ? 0
          : Math.floor(timeSec * fps) % mcSprite.frames.length;
        const f = mcSprite.frames[frameIdx];

        ctx.save();
        ctx.translate(mcCenterX, groundY + strideBob);
        ctx.scale(-1, 1); // Face LEFT so MC walks from right to left
        ctx.drawImage(
          mcSprite.image,
          f.x,
          f.y,
          f.w,
          f.h,
          -mcSize * 0.5,
          -mcSize * 0.89,
          mcSize,
          mcSize
        );
        ctx.restore();
      }

      // Draw Nerd companion floating cheerfully behind MC
      if (nerdSprite && nerdSprite.frames.length > 0) {
        const nerdSize = mcSize * 0.62;
        const nerdCenterX = mcCenterX + mcSize * (isCompact ? 0.44 : 0.54);
        const floatY = prefersReducedMotion
          ? 0
          : Math.sin(timeSec * 2.7) * 9;

        // Soft shadow on ground below floating Nerd
        ctx.save();
        const shadowPulse = 1 - floatY * 0.012;
        ctx.fillStyle = "rgba(38, 62, 34, 0.16)";
        ctx.beginPath();
        ctx.ellipse(
          nerdCenterX,
          groundY + 4,
          nerdSize * 0.22 * shadowPulse,
          nerdSize * 0.05 * shadowPulse,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();

        const nerdFps = 7.5;
        const frameIdx = prefersReducedMotion
          ? 0
          : Math.floor(timeSec * nerdFps) % nerdSprite.frames.length;
        const f = nerdSprite.frames[frameIdx];

        ctx.save();
        ctx.translate(nerdCenterX, groundY - mcSize * 0.5 + floatY);
        ctx.drawImage(
          nerdSprite.image,
          f.x,
          f.y,
          f.w,
          f.h,
          -nerdSize * 0.5,
          -nerdSize * 0.5,
          nerdSize,
          nerdSize
        );
        ctx.restore();
      }
    };

    const render = (now: number) => {
      if (cancelled) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!prefersReducedMotion) {
        elapsed += dt;
        currentPointerX += (targetPointerX - currentPointerX) * Math.min(1, dt * 4);
      }

      // Sky-to-savannah fallback backdrop while images stream in
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#5ba8f7");
      skyGrad.addColorStop(0.62, "#9dd3fc");
      skyGrad.addColorStop(0.72, "#ddf28b");
      skyGrad.addColorStop(1, "#d8ef82");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Keep savannah proportions natural on all screens
      const tileH = Math.max(height, 640);
      const drawY = height - tileH;
      const speedScale = tileH / 900;

      // 1. Background & midground layers (1..9)
      for (let i = 0; i < PARALLAX_LAYERS.length; i++) {
        const layer = PARALLAX_LAYERS[i];
        if (layer.foreground) continue;
        const img = layerImages[i];
        if (!img) continue;
        const tileW = tileH * (img.naturalWidth / img.naturalHeight);
        const offsetPx =
          elapsed * layer.speed * speedScale - currentPointerX * layer.sway;
        drawTiledLayer(img, offsetPx, drawY, tileW, tileH);
      }

      // 2. Characters walking in place on the savannah trail
      drawCharacters(elapsed, drawY, tileH);

      // 3. Foreground layers (10..11) passing in front of the characters
      for (let i = 0; i < PARALLAX_LAYERS.length; i++) {
        const layer = PARALLAX_LAYERS[i];
        if (!layer.foreground) continue;
        const img = layerImages[i];
        if (!img) continue;
        const tileW = tileH * (img.naturalWidth / img.naturalHeight);
        const offsetPx =
          elapsed * layer.speed * speedScale - currentPointerX * layer.sway;
        drawTiledLayer(img, offsetPx, drawY, tileW, tileH);
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full block"
    />
  );
}
