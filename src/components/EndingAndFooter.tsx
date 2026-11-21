import { Link } from "react-router-dom";
import { ArrowUp, Mail, MessageCircle, Instagram, Youtube, Globe } from "lucide-react";

const PLAY_URL = "https://nerdius.vercel.app";

const QUICK_LINKS = [
  { label: "Hero", href: "#top" },
  { label: "News", href: "#news" },
  { label: "Characters", href: "#characters" },
  { label: "Features", href: "#features" },
];

// shortcut: Discord and YouTube URLs still placeholder until official links are provided
const SOCIAL_LINKS = [
  { label: "Discord", href: "https://discord.com", bg: "bg-[#5865F2] hover:bg-[#4752C4]", icon: MessageCircle },
  { label: "Instagram", href: "https://www.instagram.com/_nerdius_?avpt=ZDNlZDc0MzIxNw==", bg: "bg-[#E1306C] hover:bg-[#C8235B]", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", bg: "bg-[#FF0000] hover:bg-[#D90000]", icon: Youtube },
  { label: "Play Web", href: PLAY_URL, bg: "bg-[#2B1C10] hover:bg-[#3F2A1A]", icon: Globe },
];

export function EndingAndFooter() {
  return (
    <footer id="community" className="relative w-full">
      {/* ENDING BANNER (Reference: Image 4 & 5) */}
      <div className="relative overflow-hidden border-t-[3px] border-[#2B1C10] bg-gradient-to-br from-[#345B8C] via-[#2C4E78] to-[#213B5C]">
        {/* Back to Top Tab */}
        <a
          href="#top"
          aria-label="Back to top"
          className="absolute top-0 right-0 z-20 inline-flex items-center gap-1.5 bg-[#2B1C10] px-5 py-2.5 font-display text-xs font-black tracking-widest text-[#FFE082] uppercase transition hover:bg-[#FFB830] hover:text-[#2B1C10]"
          style={{ clipPath: "polygon(14px 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <ArrowUp className="ml-2 h-4 w-4" />
          <span>Top</span>
        </a>

        {/* Subtle Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 left-4 select-none font-display text-[clamp(4.5rem,12vw,9.5rem)] font-black leading-none tracking-[-0.04em] text-white/[0.06] uppercase"
        >
          NERDIUS
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-end gap-10 px-5 pt-14 pb-12 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-12 lg:py-16">
          {/* LEFT: Character Presenting Play Nerdius CTA */}
          <div className="flex flex-col items-center text-center lg:col-span-5 lg:flex-row lg:items-end lg:text-left">
            <img
              src="/assets/features/mc.webp"
              alt="Olan inviting you to play Nerdius"
              draggable={false}
              className="h-52 w-auto shrink-0 select-none object-contain drop-shadow-[0_14px_22px_rgba(12,24,44,0.45)] sm:h-64"
            />
            <div className="mt-4 flex flex-col items-center lg:mt-0 lg:mb-4 lg:ml-2 lg:items-start">
              <p className="font-display text-xl font-black leading-snug text-white sm:text-2xl">
                Ready for your next quest?
              </p>
              <a
                href={PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-woodplank relative mt-4 inline-flex w-[220px] items-center justify-center focus-visible:rounded-2xl"
              >
                <img
                  src="/assets/ui/plank-bar.webp"
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="h-auto w-full select-none object-contain"
                />
                <span className="font-playful woodplank-text-shadow absolute inset-0 flex items-center justify-center pb-0.5 text-[1.4rem] tracking-wider text-white">
                  Play Nerdius
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT: Quick Navigation + Social Media */}
          <div className="space-y-7 lg:col-span-7 lg:pl-6">
            <div>
              <p className="mb-3 font-display text-xs font-black tracking-widest text-[#FFE082] uppercase">
                [ Home ]
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {QUICK_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-xl border-2 border-[#2B1C10] bg-[#1A130D] px-4 py-2.5 text-center font-display text-xs font-black tracking-wider text-white uppercase transition hover:bg-[#FFB830] hover:text-[#2B1C10]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/15 pt-6">
              <p className="mb-3 font-display text-xs font-black tracking-widest text-[#FFE082] uppercase">
                [ Connect With Nerdius ]
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#2B1C10] px-4 py-2.5 font-display text-xs font-black tracking-wider text-white uppercase shadow-md transition hover:-translate-y-0.5 ${social.bg}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL & INFO FOOTER */}
      <div className="bg-[#140F0B] text-[#E6D9C5]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center">
            {/* App Icon + Game Info */}
            <div className="flex items-center gap-4">
              <img
                src="/assets/app-icon.png"
                alt="Nerdius App Icon"
                draggable={false}
                className="h-16 w-16 rounded-2xl border-2 border-[#FFB830]/40 bg-[#231912] object-contain p-1.5"
              />
              <div className="space-y-0.5 font-body text-sm">
                <p className="font-display text-base font-black text-white">NERDIUS</p>
                <p className="text-[#C8B79E]">Genre: Educational Fantasy RPG</p>
                <p className="text-[#C8B79E]">Platform: Web Browser (Desktop &amp; Mobile)</p>
              </div>
            </div>

            {/* Official Title Logo */}
            <img
              src="/assets/nerdius_title.png"
              alt="Nerdius"
              draggable={false}
              className="h-12 w-auto select-none object-contain sm:h-14"
            />
          </div>

          {/* Legal Links + Copyright */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs font-bold text-[#B5A287] sm:flex-row sm:items-center">
            <nav aria-label="Legal navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                to="/terms-of-service"
                className="uppercase tracking-wider transition hover:text-[#FFE082]"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy-policy"
                className="uppercase tracking-wider transition hover:text-[#FFE082]"
              >
                Privacy Policy
              </Link>
              <a
                href="mailto:support@nerdius.app"
                className="inline-flex items-center gap-1.5 uppercase tracking-wider transition hover:text-[#FFE082]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Us</span>
              </a>
            </nav>

            <p className="text-[#8F7D66]">
              © {new Date().getFullYear()} Nerdius. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
