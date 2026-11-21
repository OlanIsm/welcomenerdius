import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "News", href: "#news" },
  { label: "Characters", href: "#characters" },
  { label: "Features", href: "#features" },
  { label: "Community", href: "#community" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#245999]/75 backdrop-blur-md shadow-[0_6px_24px_rgba(18,45,86,0.18)] py-2"
          : "bg-transparent py-3 sm:py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Large Nerdius Official Title Logo */}
        <a
          href="#top"
          aria-label="Nerdius Home"
          className="group inline-flex items-center focus-visible:rounded-xl"
        >
          <img
            src="/assets/nerdius_title.png"
            alt="Nerdius"
            className={`w-auto select-none object-contain drop-shadow-[0_4px_14px_rgba(24,52,92,0.3)] transition-all duration-300 group-hover:scale-[1.03] ${
              scrolled
                ? "h-12 sm:h-14 md:h-16"
                : "h-16 sm:h-20 md:h-24 lg:h-28"
            }`}
            draggable={false}
          />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link-shadow relative font-body text-[1.05rem] font-extrabold tracking-wide text-white/95 transition-colors hover:text-[#FFE082] after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-0 after:rounded-full after:bg-[#FFD059] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/18 text-white backdrop-blur-sm transition hover:bg-white/28 md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Navigation */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="mx-4 mt-2 rounded-2xl border border-white/25 bg-[#1e4d88]/92 p-4 shadow-xl backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 font-body text-base font-extrabold text-white transition hover:bg-white/15 hover:text-[#FFE082]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
