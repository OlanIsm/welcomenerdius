import { useState } from "react";
import { ArrowRight, Clock, ChevronRight, X } from "lucide-react";
import {
  NEWS_TABS,
  NEWS_ITEMS,
  COMMUNITY_EVENTS,
  type NewsCategory,
  type NewsItem,
} from "../data/newsData";

export function NewsSection() {
  const [activeTab, setActiveTab] = useState<NewsCategory>("important");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedNotice, setExpandedNotice] = useState<NewsItem | null>(null);

  const tabItems = NEWS_ITEMS.filter((item) => item.category === activeTab);
  const featuredItem =
    tabItems.find((item) => item.id === selectedId) ?? tabItems[0];

  const handleTabChange = (tab: NewsCategory) => {
    setActiveTab(tab);
    setSelectedId(null);
  };

  return (
    <section
      id="news"
      aria-labelledby="news-heading"
      className="relative overflow-hidden bg-[#FAF4E6] py-20 sm:py-24 lg:py-28"
    >
      {/* Subtle organic top seam connecting savannah grass to warm parchment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-[#d8ef82]/45 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2
            id="news-heading"
            className="font-display text-3xl font-black tracking-[-0.02em] text-[#2B1C10] sm:text-4xl lg:text-[2.65rem]"
          >
            Catch Up With Nerdius
          </h2>
          <p className="font-body text-base font-bold text-[#6E533B]">
            Latest updates, patch notes &amp; adventurer notices
          </p>
        </div>

        {/* Two-Column Board Layout (Reference: NIKKE News) */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-9">
          {/* LEFT COLUMN: Tabbed Notice Board */}
          <div className="lg:col-span-7">
            {/* Folder Tabs */}
            <div
              role="tablist"
              aria-label="News categories"
              className="flex items-end gap-1.5 pl-2"
            >
              {NEWS_TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => handleTabChange(tab.id)}
                    className={`cursor-pointer rounded-t-xl border-x-[2.5px] border-t-[2.5px] border-[#2B1C10] px-5 py-2.5 font-display text-sm font-black tracking-wide uppercase transition-all sm:px-7 sm:text-base ${
                      isActive
                        ? "relative z-10 -mb-[2.5px] bg-[#FFB830] pb-3 text-[#2B1C10]"
                        : "bg-[#4A3321] text-[#F6E8D0] hover:bg-[#5E412A]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Main Notice Card */}
            <div className="relative overflow-hidden rounded-2xl rounded-tl-none border-[2.5px] border-[#2B1C10] bg-[#FFFDF7] shadow-[0_14px_34px_rgba(43,28,16,0.12)]">
              {/* Featured Visual Banner */}
              <div className="p-4 pb-0 sm:p-5 sm:pb-0">
                {featuredItem.bannerType === "mascot" ? (
                  <div className="relative flex min-h-[220px] items-center justify-between overflow-hidden rounded-xl border-2 border-[#2B1C10]/15 bg-gradient-to-br from-[#64B0F6] via-[#88C7FA] to-[#DDF28B] px-6 py-5 sm:min-h-[260px] sm:px-8">
                    {/* Subtle soft sky cloud shapes */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-10 -left-10 h-44 w-44 rounded-full bg-white/25 blur-2xl"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-12 left-1/3 h-40 w-56 rounded-full bg-[#FFE28A]/30 blur-2xl"
                    />

                    {/* Left: Nerdius Title + Bold NOTICE lettering */}
                    <div className="relative z-10 flex max-w-[60%] flex-col items-start">
                      <img
                        src="/assets/nerdius_title.png"
                        alt="Nerdius"
                        draggable={false}
                        className="mb-2 h-9 w-auto object-contain drop-shadow-[0_2px_6px_rgba(24,52,92,0.28)] sm:h-11"
                      />
                      <span className="font-display text-4xl font-black tracking-tight text-white drop-shadow-[0_3px_0_rgba(43,28,16,0.32)] sm:text-5xl md:text-6xl">
                        {featuredItem.bannerHeadline ?? "NOTICE"}
                      </span>
                      <span className="mt-2 inline-block rounded-full bg-[#2B1C10]/80 px-3 py-1 font-body text-xs font-extrabold tracking-wide text-[#FFE082] uppercase">
                        Adventurer Dispatch
                      </span>
                    </div>

                    {/* Right: MC Waving Mascot */}
                    <div className="relative z-10 -mr-2 -mb-5 flex shrink-0 items-end sm:mr-1">
                      <img
                        src="/assets/news/mc-wave.png"
                        alt="MC waving hello"
                        draggable={false}
                        className="h-44 w-auto object-contain drop-shadow-[0_8px_14px_rgba(43,28,16,0.22)] sm:h-56"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative h-[220px] overflow-hidden rounded-xl border-2 border-[#2B1C10]/15 bg-[#3B2515] sm:h-[260px]">
                    <img
                      src={featuredItem.bannerImage}
                      alt={featuredItem.title}
                      className={`h-full w-full transition-transform duration-500 ${
                        featuredItem.bannerFit === "contain"
                          ? "object-contain p-1.5"
                          : "object-cover object-center hover:scale-[1.03]"
                      }`}
                    />
                    {featuredItem.bannerFit !== "contain" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2B1C10]/70 via-[#2B1C10]/15 to-transparent" />
                    )}
                    <img
                      src="/assets/nerdius_title.png"
                      alt="Nerdius"
                      draggable={false}
                      className="absolute top-3 left-4 h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:h-10"
                    />
                  </div>
                )}
              </div>

              {/* Featured Copy */}
              <div className="px-5 pt-5 pb-4 sm:px-6">
                <time className="font-body text-sm font-extrabold tracking-wide text-[#8C6D4F]">
                  {featuredItem.date}
                </time>
                <h3 className="mt-1 font-display text-xl font-black leading-snug text-[#2B1C10] sm:text-2xl">
                  {featuredItem.title}
                </h3>
                <p className="mt-2 font-body text-[0.98rem] font-semibold leading-relaxed text-[#5C4430]">
                  {featuredItem.summary}
                </p>

                {/* Other items in this tab */}
                {tabItems.length > 1 && (
                  <div className="mt-4 border-t border-[#E8DEC8] pt-3">
                    <ul className="space-y-1.5">
                      {tabItems.map((item) => {
                        const isSelected = item.id === featuredItem.id;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => setSelectedId(item.id)}
                              className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition ${
                                isSelected
                                  ? "bg-[#FFF1CC] text-[#2B1C10]"
                                  : "text-[#5C4430] hover:bg-[#F5EFE0]"
                              }`}
                            >
                              <span className="truncate font-body text-sm font-extrabold">
                                {item.title}
                              </span>
                              <span className="shrink-0 font-body text-xs font-bold text-[#8C6D4F]">
                                {item.date}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Bar with Angled "MORE" Action (Reference: Image 1) */}
              <div className="flex items-center justify-between border-t-2 border-[#EFE5CE] bg-[#F7F0DF]">
                <span className="px-5 py-3 font-body text-xs font-extrabold tracking-wider text-[#8C6D4F] uppercase sm:px-6">
                  Nerdius Patch Board
                </span>
                <button
                  type="button"
                  onClick={() => setExpandedNotice(featuredItem)}
                  className="group inline-flex cursor-pointer items-center gap-2 bg-[#FFB830] px-6 py-3 font-display text-sm font-black tracking-wider text-[#2B1C10] uppercase transition-colors hover:bg-[#F5A016] sm:px-8"
                  style={{
                    clipPath: "polygon(14px 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <span className="pl-2">More</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Active Events & Community Follow Panel */}
          <div className="lg:col-span-5 lg:mt-[42px]">
            <div className="overflow-hidden rounded-2xl border-[2.5px] border-[#2B1C10] bg-[#FFFDF7] shadow-[0_14px_34px_rgba(43,28,16,0.12)]">
              {/* Top Panel Header */}
              <div className="flex items-center justify-between border-b-2 border-[#2B1C10] bg-[#4A3321] px-5 py-2.5 text-[#FFF4DC]">
                <span className="font-display text-xs font-black tracking-widest uppercase">
                  Guild Events &amp; Highlights
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-xs font-bold text-[#FFD059]">
                  <span className="h-2 w-2 rounded-full bg-[#8BE04E]" />
                  Live Now
                </span>
              </div>

              {/* Event Cards Stack */}
              <div className="divide-y divide-[#EFE5CE] p-4 sm:p-5">
                {COMMUNITY_EVENTS.map((ev, index) => (
                  <article
                    key={ev.id}
                    className={index === 0 ? "pb-5" : "pt-5"}
                  >
                    {/* Status & Time Row */}
                    <div className="mb-2.5 flex items-center justify-between text-xs font-extrabold">
                      <span className="rounded-md bg-[#E6F4D7] px-2.5 py-1 text-[#2E6118]">
                        {ev.status}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#7D6145]">
                        <Clock className="h-3.5 w-3.5" />
                        {ev.timeRemaining}
                      </span>
                    </div>

                    {/* Visual Event Banner */}
                    <div className="relative h-32 overflow-hidden rounded-xl border-2 border-[#2B1C10]/15 sm:h-36">
                      <img
                        src={ev.bannerImage}
                        alt={ev.title}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2B1C10]/65 via-[#2B1C10]/25 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-between px-4">
                        <span className="max-w-[68%] font-display text-base font-black leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:text-lg">
                          {ev.title.replace(/^\[[^\]]+\]\s*/, "")}
                        </span>
                        <img
                          src={ev.badgeImage}
                          alt=""
                          aria-hidden="true"
                          className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] sm:h-20 sm:w-20"
                        />
                      </div>
                    </div>

                    {/* Event Title & Description */}
                    <h3 className="mt-3 font-display text-[1.02rem] font-black text-[#2B1C10]">
                      {ev.title}
                    </h3>
                    <p className="mt-1 font-body text-sm font-semibold leading-relaxed text-[#5C4430]">
                      {ev.description}
                    </p>
                  </article>
                ))}
              </div>

              {/* Bottom "Follow Us" Strip (Reference: Image 1) */}
              <div className="flex items-center justify-between border-t-2 border-[#EFE5CE] bg-[#F7F0DF]">
                <span className="px-5 py-3 font-display text-xs font-black tracking-wider text-[#6E533B] uppercase">
                  Follow Us
                </span>
                <a
                  href="#community"
                  className="group inline-flex items-center gap-2 bg-[#4EA1F3] px-6 py-3 font-display text-sm font-black tracking-wide text-white transition-colors hover:bg-[#3A8EE3]"
                  style={{
                    clipPath: "polygon(14px 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <span className="pl-2">@nerdius.game</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Details Modal (Only opens when user clicks MORE) */}
      {expandedNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notice-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1C10]/60 p-4 backdrop-blur-xs"
          onClick={() => setExpandedNotice(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border-[2.5px] border-[#2B1C10] bg-[#FFFDF7] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-[#2B1C10] bg-[#FFB830] px-6 py-4">
              <div>
                <time className="font-body text-xs font-extrabold tracking-wider text-[#2B1C10]/75 uppercase">
                  {expandedNotice.date} · {expandedNotice.category}
                </time>
                <h3
                  id="notice-modal-title"
                  className="font-display text-lg font-black text-[#2B1C10] sm:text-xl"
                >
                  {expandedNotice.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setExpandedNotice(null)}
                aria-label="Close notice"
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-[#2B1C10] bg-[#FFFDF7] text-[#2B1C10] transition hover:bg-[#FAF0D7]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="font-body text-base font-bold leading-relaxed text-[#4A3321]">
                {expandedNotice.summary}
              </p>
              <ul className="mt-4 space-y-2.5">
                {expandedNotice.details.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 font-body text-sm font-semibold leading-relaxed text-[#5C4430]"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#E68A18]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
