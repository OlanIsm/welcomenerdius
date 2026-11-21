import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { FEATURES } from "../data/featuresData";
import { SpriteCanvas } from "./SpriteCanvas";

export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = FEATURES.length;

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  // Compute signed shortest circular offset (-1 left, 0 center, 1 right, 2 hidden back)
  const getOffset = (idx: number) => {
    let diff = (idx - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;
    return diff;
  };

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative overflow-hidden border-t-[3px] border-[#2B1C10]/20 py-20 sm:py-24 lg:py-28"
      style={{
        backgroundColor: "#42B5FA",
        backgroundImage: "url('/assets/features/oceanlandscape.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle oceanic depth vignette so foreground islands & cards pop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1A73B8]/25 via-transparent to-[#155E9C]/35"
      />

      {/* Floating Map Islands from assets/map/ */}
      <img
        src="/assets/features/island-kingdom.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="animate-island-slow pointer-events-none absolute top-14 -left-10 w-52 select-none opacity-95 drop-shadow-[0_14px_18px_rgba(14,68,118,0.34)] sm:left-4 sm:w-64 lg:top-16 lg:left-10 lg:w-80"
      />
      <img
        src="/assets/features/island-lava.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="animate-island-mid pointer-events-none absolute top-8 -right-12 w-48 select-none opacity-95 drop-shadow-[0_14px_18px_rgba(14,68,118,0.34)] sm:right-4 sm:w-60 lg:top-12 lg:right-12 lg:w-72"
      />
      <img
        src="/assets/features/island-desert.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="animate-island-gentle pointer-events-none absolute -bottom-8 left-1/2 hidden w-64 -translate-x-1/2 select-none opacity-90 drop-shadow-[0_14px_18px_rgba(14,68,118,0.34)] md:block lg:left-[18%] lg:translate-x-0 lg:w-72"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Top-Left Heading with Woodplank Subtitle */}
        <div className="mb-10 sm:mb-12">
          <h2
            id="features-heading"
            className="hero-text-shadow font-display text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            FEATURES
          </h2>
          <div className="relative mt-2 inline-flex w-[240px] items-center justify-center drop-shadow-[0_6px_12px_rgba(18,52,98,0.35)] sm:w-[275px]">
            <img
              src="/assets/ui/plank-bar.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="block h-auto w-full select-none object-contain"
            />
            <span className="font-playful woodplank-text-shadow absolute inset-0 flex items-center justify-center pb-0.5 text-sm tracking-wider text-white sm:text-base">
              Adventure With Nerdius
            </span>
          </div>
        </div>

        {/* 3-Card Smooth Ease-In-Out Carousel Stage */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous feature"
            className="z-30 inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border-[2.5px] border-[#2B1C10] bg-[#FFFDF7] text-[#2B1C10] shadow-[0_8px_18px_rgba(18,52,98,0.28)] transition hover:scale-105 hover:bg-[#FFB830] sm:h-14 sm:w-14"
          >
            <ChevronsLeft className="h-6 w-6" />
          </button>

          {/* Animated Cards Stage (all slides stay mounted so CSS transform eases smoothly) */}
          <div className="relative h-[450px] w-full max-w-[920px] sm:h-[500px]">
            {FEATURES.map((slide, idx) => {
              const offset = getOffset(idx);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isHidden = !isCenter && !isLeft && !isRight;

              let positionClass =
                "translate-x-[-50%] scale-75 opacity-0 pointer-events-none z-0";
              if (isCenter) {
                positionClass =
                  "translate-x-[-50%] scale-100 opacity-100 z-20 shadow-[0_22px_44px_rgba(16,44,84,0.42)]";
              } else if (isLeft) {
                positionClass =
                  "translate-x-[-50%] md:translate-x-[calc(-50%-290px)] lg:translate-x-[calc(-50%-325px)] scale-[0.84] opacity-0 md:opacity-80 md:grayscale-[20%] z-10 cursor-pointer hover:md:opacity-95 shadow-[0_12px_28px_rgba(16,44,84,0.28)]";
              } else if (isRight) {
                positionClass =
                  "translate-x-[-50%] md:translate-x-[calc(-50%+290px)] lg:translate-x-[calc(-50%+325px)] scale-[0.84] opacity-0 md:opacity-80 md:grayscale-[20%] z-10 cursor-pointer hover:md:opacity-95 shadow-[0_12px_28px_rgba(16,44,84,0.28)]";
              }

              return (
                <article
                  key={slide.id}
                  onClick={!isCenter && !isHidden ? () => setActiveIndex(idx) : undefined}
                  aria-hidden={isHidden}
                  className={`absolute top-1/2 left-1/2 h-[440px] w-[300px] -translate-y-1/2 overflow-hidden rounded-2xl border-[3px] border-[#2B1C10] bg-[#1E1712] transition-all duration-500 ease-in-out sm:h-[490px] sm:w-[345px] ${positionClass}`}
                >
                  {/* Card Full-Bleed Background */}
                  <img
                    src={slide.bgImage}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />

                  {/* Contrast Gradient Overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/45 to-[#1A120B]/15"
                  />

                  {/* Top Mini Logo + Feature Tag */}
                  <div className="relative z-10 flex items-center justify-between px-4 pt-4">
                    <img
                      src="/assets/nerdius_title.png"
                      alt="Nerdius"
                      draggable={false}
                      className="h-7 w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
                    />
                    <span
                      className="rounded-full border border-[#2B1C10] px-2.5 py-0.5 font-display text-[0.68rem] font-black tracking-wider text-[#2B1C10] uppercase"
                      style={{ backgroundColor: slide.accentColor }}
                    >
                      {slide.tag}
                    </span>
                  </div>

                  {/* Center-Bottom Foreground Character / Game Asset */}
                  <div className="relative z-10 flex h-[54%] items-center justify-center px-5 pt-2">
                    {slide.foregroundSprite ? (
                      <SpriteCanvas
                        jsonUrl={slide.foregroundSprite.jsonUrl}
                        imageUrl={slide.foregroundSprite.imageUrl}
                        fps={slide.foregroundSprite.fps}
                        active={isCenter}
                        fallbackSrc={slide.foregroundImage}
                        alt={slide.foregroundAlt}
                        className="h-full w-full drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
                      />
                    ) : (
                      <img
                        src={slide.foregroundImage}
                        alt={slide.foregroundAlt}
                        draggable={false}
                        className="max-h-full w-auto object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
                      />
                    )}
                  </div>

                  {/* Bottom Title & Description */}
                  <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-5 pt-3">
                    <h3 className="font-display text-xl font-black leading-tight tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:text-2xl">
                      {slide.title}
                    </h3>
                    <p
                      className={`mt-2 font-body text-sm font-bold leading-relaxed text-[#F3E9D7] transition-opacity duration-500 ease-in-out ${
                        isCenter ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {slide.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next feature"
            className="z-30 inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border-[2.5px] border-[#2B1C10] bg-[#FFFDF7] text-[#2B1C10] shadow-[0_8px_18px_rgba(18,52,98,0.28)] transition hover:scale-105 hover:bg-[#FFB830] sm:h-14 sm:w-14"
          >
            <ChevronsRight className="h-6 w-6" />
          </button>
        </div>

        {/* Carousel Indicator Dots */}
        <div
          role="tablist"
          aria-label="Feature slides"
          className="mt-8 flex items-center justify-center gap-2.5"
        >
          {FEATURES.map((item, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Show feature: ${item.title}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-3 cursor-pointer rounded-full border-2 border-[#2B1C10] transition-all duration-300 ease-in-out ${
                  active
                    ? "w-9 bg-[#FFB830]"
                    : "w-3 bg-white/85 hover:bg-[#FFE082]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
