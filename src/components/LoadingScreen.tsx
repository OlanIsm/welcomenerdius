import { useEffect, useState } from "react";

const CRITICAL_ASSETS = [
  "/assets/nerdius_title.png",
  "/assets/ui/plank-bar.webp",
  "/assets/savannah/1.webp",
  "/assets/savannah/2.webp",
  "/assets/savannah/3.webp",
  "/assets/savannah/4.webp",
  "/assets/savannah/5.webp",
  "/assets/savannah/6.webp",
  "/assets/savannah/7.webp",
  "/assets/savannah/8.webp",
  "/assets/savannah/9.webp",
  "/assets/savannah/10.webp",
  "/assets/savannah/11.webp",
  "/assets/characters/mc-walk/spritesheet.png",
  "/assets/characters/nerd-well-actually/spritesheet.png",
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let finished = false;
    const total = CRITICAL_ASSETS.length + 1; // +1 for fonts
    let loaded = 0;

    // Lock body scroll while loading curtain is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      setProgress(100);
      window.setTimeout(() => {
        if (cancelled) return;
        setExiting(true);
        document.body.style.overflow = prevOverflow;
        window.setTimeout(() => {
          if (!cancelled) setDone(true);
        }, 760);
      }, 280);
    };

    const tick = () => {
      if (cancelled || finished) return;
      loaded += 1;
      const pct = Math.min(100, Math.round((loaded / total) * 100));
      setProgress(pct);
      if (loaded >= total) finish();
    };

    // Safety cap so slow/offline asset never traps visitor
    const safetyTimer = window.setTimeout(finish, 5000);

    CRITICAL_ASSETS.forEach((src) => {
      preloadImage(src).then(tick);
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(tick).catch(tick);
    } else {
      tick();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading Nerdius ${progress}%`}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF4E6] px-6 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      {/* Nerdius Title Logo with Left-to-Right Color Fill Progress */}
      <div className="relative w-[260px] select-none sm:w-[360px] md:w-[440px]">
        {/* Unfilled Base Silhouette */}
        <img
          src="/assets/nerdius_title.png"
          alt="Nerdius"
          draggable={false}
          className="block h-auto w-full object-contain opacity-22 grayscale"
        />

        {/* Full-Color Reveal Clipped Left-to-Right by Real Asset Progress */}
        <img
          src="/assets/nerdius_title.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 block h-auto w-full object-contain transition-[clip-path] duration-200 ease-out"
          style={{
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
          }}
        />
      </div>

      {/* Subtle Progress Counter */}
      <p className="mt-5 font-display text-sm font-black tracking-widest text-[#6E533B] uppercase tabular-nums">
        Loading Realm · {progress}%
      </p>
    </div>
  );
}
