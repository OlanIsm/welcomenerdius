import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, ChevronsLeft, ChevronsRight, Sparkles } from "lucide-react";
import { CHARACTERS } from "../data/charactersData";
import { SpriteCanvas, preloadSpriteSheet } from "./SpriteCanvas";

export function CharacterSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [animIndex, setAnimIndex] = useState(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const character = CHARACTERS[activeIndex];
  const currentAnim = character.animations[animIndex] ?? character.animations[0];

  // Stop voice audio cleanly when switching characters or unmounting
  const stopVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlayingVoice(false);
  };

  useEffect(() => {
    // Preload all character spritesheets once so switching & toggling animations is instant
    CHARACTERS.forEach((char) => {
      char.animations.forEach((anim) => {
        preloadSpriteSheet(anim.jsonUrl, anim.imageUrl).catch(() => {});
      });
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const selectCharacter = (index: number) => {
    if (index === activeIndex) return;
    stopVoice();
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setAnimIndex(0);
  };

  const handlePrev = () => {
    selectCharacter((activeIndex - 1 + CHARACTERS.length) % CHARACTERS.length);
  };

  const handleNext = () => {
    selectCharacter((activeIndex + 1) % CHARACTERS.length);
  };

  const toggleVoice = () => {
    if (!character.voiceUrl) return;
    if (isPlayingVoice) {
      stopVoice();
      return;
    }
    stopVoice();
    const audio = new Audio(character.voiceUrl);
    audioRef.current = audio;
    setIsPlayingVoice(true);
    audio.onended = () => setIsPlayingVoice(false);
    audio.onerror = () => setIsPlayingVoice(false);
    audio.play().catch(() => setIsPlayingVoice(false));
  };

  return (
    <section
      id="characters"
      aria-labelledby="characters-heading"
      className="relative overflow-hidden border-t-2 border-[#E7DEC8] py-20 transition-colors duration-700 ease-in-out sm:py-24 lg:py-28"
      style={{
        backgroundColor: `color-mix(in srgb, ${character.accentSoft} 26%, #F2E9D5)`,
      }}
    >
      {/* Dramatic Diagonal Accent Ribbon with smooth color transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[37%] hidden w-[26%] -skew-x-12 transition-colors duration-700 ease-in-out lg:block"
        style={{ backgroundColor: character.accentSoft }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[63%] hidden w-2.5 -skew-x-12 opacity-80 transition-colors duration-700 ease-in-out lg:block"
        style={{ backgroundColor: character.accentColor }}
      />

      {/* Oversized Watermark Character Name behind stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-14 left-4 select-none font-display text-[clamp(5.5rem,14vw,12rem)] font-black leading-none tracking-[-0.04em] text-[#2B1C10]/[0.06] uppercase lg:top-16 lg:left-10"
      >
        {character.watermark}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Mobile/Tablet Top Title */}
        <div className="mb-8 lg:hidden">
          <h2
            id="characters-heading-mobile"
            className="font-display text-3xl font-black tracking-[-0.02em] text-[#2B1C10] sm:text-4xl"
          >
            CHARACTER
          </h2>
          <p className="mt-1 inline-block rounded-md bg-[#2B1C10] px-3 py-1 font-display text-xs font-black tracking-widest text-[#FFE082] uppercase">
            Know More About Nerdius
          </p>
        </div>

        {/* 3-Column Showcase Grid (fixed desktop height so layout never shifts between characters) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:h-[580px] lg:grid-cols-12 lg:gap-6">
          {/* LEFT COLUMN: Character Dossier & Backstory (top-anchored so elements stay fixed) */}
          <div className="order-2 flex flex-col items-start lg:order-1 lg:col-span-4 lg:self-start lg:pt-6 lg:pr-10 xl:pr-14">
            {/* Faction / Archetype Pill */}
            <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border-2 border-[#2B1C10] bg-[#4A3321] px-3.5 py-1 font-body text-xs font-extrabold tracking-wider text-[#FFF1CC] uppercase">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: character.accentColor }}
              />
              {character.faction}
            </div>

            {/* Woodplank Name Plaque */}
            <div className="relative w-full max-w-[300px] drop-shadow-[0_8px_14px_rgba(43,28,16,0.22)]">
              <img
                src="/assets/ui/plank-bar.webp"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="block h-auto w-full select-none object-contain"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-1 text-center">
                <h3 className="font-playful woodplank-text-shadow text-3xl leading-none tracking-wide text-white sm:text-[2.15rem]">
                  {character.name}
                </h3>
              </div>
            </div>

            {/* Role Subtitle */}
            <p className="mt-2 font-display text-sm font-black tracking-wide text-[#5C4430]">
              {character.role}
            </p>

            {/* Controls Row: Voice Clip + Animation Switcher */}
            <div className="mt-4 flex min-h-[44px] flex-wrap items-center gap-2.5">
              {character.voiceUrl && (
                <button
                  type="button"
                  onClick={toggleVoice}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#2B1C10] px-4 py-2 font-display text-xs font-black tracking-wider text-white uppercase shadow-sm transition hover:brightness-110"
                  style={{ backgroundColor: character.accentColor }}
                >
                  {isPlayingVoice ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                  <span>{isPlayingVoice ? "Stop Voice" : character.voiceLabel}</span>
                </button>
              )}

              {character.animations.length > 1 && (
                <div className="inline-flex overflow-hidden rounded-xl border-2 border-[#2B1C10] bg-[#FFFDF7]">
                  {character.animations.map((anim, idx) => {
                    const active = idx === animIndex;
                    return (
                      <button
                        key={anim.label}
                        type="button"
                        onClick={() => setAnimIndex(idx)}
                        className={`inline-flex cursor-pointer items-center gap-1.5 px-3.5 py-2 font-display text-xs font-black tracking-wide uppercase transition ${
                          active
                            ? "bg-[#FFB830] text-[#2B1C10]"
                            : "text-[#5C4430] hover:bg-[#F5ECD6]"
                        }`}
                      >
                        {idx > 0 && <Sparkles className="h-3.5 w-3.5" />}
                        {anim.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Backstory Copy */}
            <div className="mt-6 space-y-3 border-l-2 border-[#2B1C10]/25 pl-4">
              {character.backstory.map((paragraph, i) => (
                <p
                  key={i}
                  className="max-w-[46ch] font-body text-[0.98rem] font-semibold leading-relaxed text-[#3F2C1D]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN: Live Animated Character with Slide-Left / Enter-From-Right Transition */}
          <div className="order-1 flex flex-col items-center justify-center lg:order-2 lg:col-span-4">
            <div className="relative flex h-[300px] w-full max-w-[380px] items-center justify-center overflow-hidden sm:h-[360px] lg:h-[420px]">
              {/* Soft grounded studio shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 h-8 w-52 rounded-full bg-[#2B1C10]/16 blur-md"
              />
              {CHARACTERS.map((char, idx) => {
                const isActive = idx === activeIndex;
                const isExiting = idx === prevIndex && !isActive;
                const anim = isActive ? currentAnim : char.animations[0];

                let slideClass =
                  "translate-x-28 opacity-0 scale-95 pointer-events-none";
                if (isActive) {
                  slideClass = "translate-x-0 opacity-100 scale-100 z-10";
                } else if (isExiting) {
                  slideClass =
                    "-translate-x-28 opacity-0 scale-95 pointer-events-none z-0";
                }

                return (
                  <div
                    key={char.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${slideClass}`}
                  >
                    <SpriteCanvas
                      jsonUrl={anim.jsonUrl}
                      imageUrl={anim.imageUrl}
                      fps={anim.fps}
                      active={isActive}
                      fallbackSrc={char.portraitUrl}
                      alt={`${char.name} — ${anim.label} animation`}
                      className="h-full w-full drop-shadow-[0_14px_20px_rgba(43,28,16,0.18)]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Heading + Portrait Roster Grid (Reference: Image 2) */}
          <div className="order-3 flex flex-col items-center lg:col-span-4 lg:items-end lg:pl-10 xl:pl-14">
            {/* Desktop Heading */}
            <div className="mb-8 hidden text-right lg:block">
              <h2
                id="characters-heading"
                className="font-display text-5xl font-black tracking-[-0.03em] text-[#2B1C10]"
              >
                CHARACTER
              </h2>
              <div className="mt-2 inline-flex items-center gap-3 rounded-lg bg-[#2B1C10] px-4 py-1.5 text-[#FFE082]">
                <span className="font-display text-xs font-black tracking-widest uppercase">
                  Know More About Nerdius
                </span>
              </div>
            </div>

            {/* Selector Grid + Prev/Next Chevrons */}
            <div className="flex items-center gap-6 sm:gap-7">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous character"
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-[#2B1C10] bg-[#FFFDF7] text-[#2B1C10] shadow-sm transition hover:bg-[#FFB830]"
              >
                <ChevronsLeft className="h-5 w-5" />
              </button>

              <div
                role="listbox"
                aria-label="Select a character"
                className="grid grid-cols-2 gap-5 sm:gap-6"
              >
                {CHARACTERS.map((char, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={char.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => selectCharacter(idx)}
                      className={`group relative h-24 w-24 cursor-pointer overflow-hidden rounded-2xl border-[2.5px] bg-[#FFFDF7] p-1.5 transition-all duration-200 sm:h-28 sm:w-28 ${
                        isSelected
                          ? "scale-[1.04] border-[#2B1C10] shadow-[0_10px_22px_rgba(43,28,16,0.22)] ring-4 ring-[#FFB830]"
                          : "border-[#2B1C10]/35 hover:border-[#2B1C10] hover:scale-[1.02]"
                      }`}
                    >
                      <img
                        src={char.portraitUrl}
                        alt={char.name}
                        draggable={false}
                        className={`h-full w-full object-contain transition-all duration-300 ${
                          isSelected
                            ? "grayscale-0 opacity-100"
                            : "grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100"
                        }`}
                      />
                      <span
                        className={`absolute inset-x-0 bottom-0 py-0.5 text-center font-display text-[0.68rem] font-black tracking-wider uppercase transition ${
                          isSelected
                            ? "bg-[#2B1C10] text-[#FFE082]"
                            : "bg-[#2B1C10]/70 text-white/90 group-hover:bg-[#2B1C10]"
                        }`}
                      >
                        {char.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next character"
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-[#2B1C10] bg-[#FFFDF7] text-[#2B1C10] shadow-sm transition hover:bg-[#FFB830]"
              >
                <ChevronsRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
