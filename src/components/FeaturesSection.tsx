import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { FEATURES } from "../data/featuresData";

export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = FEATURES.length;

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const goPrev = () => setActiveIndex(prevIndex);
  const goNext = () => setActiveIndex(nextIndex);

  const visibleSlides = [
    { slide: FEATURES[prevIndex], index: prevIndex, position: "left" as const },
    { slide: FEATURES[activeIndex], index: activeIndex, position: "center" as const },
    { slide: FEATURES[nextIndex], index: nextIndex, position: "right" as const },
  ];

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
        {/* Top-Left Heading (Reference: Image 3 NIKKE Features) */}
        <div className="mb-12 sm:mb-14">
          <h2
            id="features-heading"
            className="hero-text-shadow font-display text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            FEATURES
          </h2>
          <div className="mt-2 inline-flex items-center rounded-lg border-2 border-[#2B1C10] bg-[#2B1C10] px-4 py-1.5 text-[#FFE082] shadow-md">
            <span className="font-display text-xs font-black tracking-widest uppercase sm:text-sm">
              Adventure With Nerdius
            </span>
          </div>
        </div>

        {/* 3-Card Carousel Stage */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 lg:gap-8">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous feature"
            className="z-30 inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border-[2.5px] border-[#2B1C10] bg-[#FFFDF7] text-[#2B1C10] shadow-[0_8px_18px_rgba(18,52,98,0.28)] transition hover:scale-105 hover:bg-[#FFB830] sm:h-14 sm:w-14"
          >
            <ChevronsLeft className="h-6 w-6" />
          </button>

          {/* Cards Track */}
          <div className="flex w-full max-w-4xl items-center justify-center gap-4 sm:gap-6">
            {visibleSlides.map(({ slide, index, position }) => {
              const isCenter = position === "center";
              return (
                <article
                  key={`${slide.id}-${position}`}
                  onClick={!isCenter ? () => setActiveIndex(index) : undefined}
                  className={`relative overflow-hidden rounded-2xl border-[3px] border-[#2B1C10] bg-[#1E1712] transition-all duration-300 ${
                    isCenter
                      ? "z-20 h-[440px] w-full max-w-[320px] scale-100 opacity-100 shadow-[0_22px_44px_rgba(16,44,84,0.42)] sm:h-[490px] sm:max-w-[350px]"
                      : "hidden h-[380px] w-[240px] shrink-0 cursor-pointer opacity-80 grayscale-[20%] shadow-[0_12px_28px_rgba(16,44,84,0.28)] hover:scale-[1.03] hover:opacity-95 md:block lg:h-[420px] lg:w-[265px]"
                  }`}
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
                    <img
                      src={slide.foregroundImage}
                      alt={slide.foregroundAlt}
                      draggable={false}
                      className={`max-h-full w-auto object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)] transition-transform duration-300 ${
                        isCenter ? "scale-100" : "scale-95"
                      }`}
                    />
                  </div>

                  {/* Bottom Title & Description */}
                  <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-5 pt-3">
                    <h3
                      className={`font-display font-black leading-tight tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] ${
                        isCenter ? "text-xl sm:text-2xl" : "text-lg"
                      }`}
                    >
                      {slide.title}
                    </h3>
                    {isCenter && (
                      <p className="mt-2 font-body text-sm font-bold leading-relaxed text-[#F3E9D7]">
                        {slide.description}
                      </p>
                    )}
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
                className={`h-3 cursor-pointer rounded-full border-2 border-[#2B1C10] transition-all duration-200 ${
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
