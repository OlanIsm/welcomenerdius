import { ChevronDown } from "lucide-react";
import { Navbar } from "./Navbar";
import { SavannahParallaxCanvas } from "./SavannahParallaxCanvas";

const PLAY_URL = "https://nerdius.vercel.app";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Welcome to Nerdius"
      className="relative min-h-[100svh] w-full overflow-hidden select-none"
    >
      {/* Living 11-layer Savannah Parallax + Animated MC & Nerd */}
      <SavannahParallaxCanvas />

      {/* Gentle atmospheric readability scrim behind left copy only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_56%_at_24%_44%,rgba(26,78,142,0.30)_0%,rgba(26,78,142,0.10)_52%,transparent_100%)]"
      />

      {/* Top Navigation with Big Official Nerdius Title */}
      <Navbar />

      {/* Left-aligned Hero Copy & Play Now CTA (Cobblemon-inspired open composition) */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-start px-6 pt-32 pb-20 sm:px-8 sm:pt-36 md:justify-center md:pt-16 md:pb-24 lg:px-12">
        <div className="max-w-xl md:-mt-16">
          <h1 className="hero-text-shadow font-display text-[clamp(2.35rem,4.8vw,3.95rem)] font-black leading-[1.06] tracking-[-0.025em] text-white text-balance">
            Study less boring, level up for real.
          </h1>

          <p className="hero-text-shadow mt-4 max-w-[44ch] font-body text-base font-bold leading-relaxed text-white/95 sm:text-lg md:text-[1.18rem]">
            Upload your lecture notes and turn them into a hand-drawn fantasy
            RPG adventure quiz.
          </p>

          <div className="mt-7 flex flex-wrap items-center">
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-woodplank relative inline-flex w-[225px] items-center justify-center focus-visible:rounded-2xl sm:w-[260px]"
            >
              <img
                src="/assets/ui/plank-bar.webp"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="h-auto w-full select-none object-contain"
              />
              <span className="font-playful woodplank-text-shadow absolute inset-0 flex items-center justify-center pb-0.5 text-[1.45rem] tracking-wider text-white sm:text-[1.7rem]">
                Play Now
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <a
        href="#news"
        aria-label="Scroll to explore Nerdius"
        className="animate-gentle-bob absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#2b1c10]/25 p-2 text-white/90 backdrop-blur-[2px] transition hover:bg-[#2b1c10]/40 focus-visible:outline-2"
      >
        <ChevronDown className="h-5 w-5" />
      </a>
    </section>
  );
}
