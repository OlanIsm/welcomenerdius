# Nerdius Landing Page — Product Requirements Document (PRD)

## 1. Overview
- **Product Name:** Nerdius
- **Game URL:** https://nerdius.vercel.app
- **Genre:** Educational Fantasy RPG (Web Game)
- **Core Hook:** Players upload their lecture/study materials (e.g., PDFs/notes) and Nerdius transforms them into an interactive fantasy RPG adventure quiz.
- **Visual Identity:** Cartoon hand-drawn art style, warm organic colors, smooth & soothing animations, playful yet cozy fantasy atmosphere.
- **Purpose of Website:** Official landing page for Nerdius to introduce new players to the game, keep existing players updated with news/announcements, showcase characters & features, and host required legal pages (Privacy Policy & Terms of Service).

---

## 2. Recommended Tech Stack (Frontend-Only)
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + custom theme tokens matching Nerdius's hand-drawn fantasy palette
- **Routing:** `react-router-dom` (for `/`, `/privacy-policy`, `/terms-of-service`)
- **Animations & Rendering:**
  - HTML5 `<canvas>` (`requestAnimationFrame` + `devicePixelRatio`) for the 11-layer Savannah Parallax & synchronized spritesheet character animations (MC walking + Nerd floating).
  - Smooth CSS transitions and lightweight motion for UI interactions, respecting `prefers-reduced-motion`.
- **Fonts (Self-Hosted from Game Assets):**
  - Display / Headings / Buttons: `Rubik` (`Rubik_700Bold`, `Rubik_900Black`)
  - Body / Navigation: `Nunito` (`Nunito-Variable`)
- **Deployment:** Vercel (static SPA build, zero backend needed).

---

## 3. Page Architecture & Sections

### Phase 1: Project Setup, Header & Hero Section (Current Focus)
- **Header / Navbar:**
  - Transparent overlay floating at the top of the hero scene (sticky subtle backdrop when scrolled).
  - Left: Large official `nerdius_title.png` logo.
  - Right: Clean navigation links (`News`, `Characters`, `Features`, `Community`) + mobile drawer menu.
- **Hero Section (Reference: Cobblemon Hero Layout):**
  - Full-viewport (`100svh`) living Savannah world using `assets/savannah parallax/Savannah Parallax/compressed/1.webp`–`11.webp`.
  - Smooth, soothing multi-depth parallax scrolling from **left to right**, creating the illusion that the characters are adventuring from **right to left**.
  - Characters walking in place on the sandy savannah trail (right-center area):
    - **MC (`mc-walk` spritesheet):** Walking right-to-left (horizontally flipped) in place.
    - **Nerd (`nerd-well-actually` spritesheet):** Floating gently beside MC as a companion, facing left.
  - Foreground layers (`10.webp`, `11.webp`) scroll *in front* of the characters for lush depth-of-field.
  - Left-aligned hero copy & CTA:
    - Slogan: **"Study less boring, level up for real."**
    - Short tagline explaining the lecture-to-RPG-adventure concept.
    - Primary CTA button: **"Play Now"** → `https://nerdius.vercel.app`.

### Phase 2: News & Updates Section (Reference: NIKKE News)
- Tabbed announcement hub (`Important`, `News`, `Notice`).
- Featured announcement banner card with date, title, and "More" action.
- Scrollable/stacked list of recent updates, patch notes, and community events.
- Social/Community follow callout.

### Phase 3: Character Showcase Section (Reference: NIKKE Character)
- Interactive character selector grid using official portraits (`assets/character/Profiles/`: MC, Nerd, Hannah, Olan, Snarger).
- Selected character displays full animated sprite/artwork (`idle` / `attack` / `wave`), character name, role/archetype, and backstory lore.

### Phase 4: Features Section (Reference: NIKKE Features)
- Interactive horizontal card carousel / showcase highlighting Nerdius's core gameplay pillars:
  1. Upload Lecture Materials → Adventure Quiz
  2. Hand-Drawn Cartoon Fantasy World
  3. RPG Combat, Companions & Progression
  4. Badges, Grades & Study Streaks

### Phase 5: Ending CTA & Footer + Legal Pages (Reference: NIKKE Ending/Footer)
- **Ending Banner:**
  - Featured character artwork presenting a prominent **"Play Nerdius"** CTA button.
  - Quick section navigation links + Social Media links (Discord, Instagram, Twitter/X, YouTube, etc.).
  - "Back to Top" button.
- **Footer:**
  - Nerdius app icon, game info (Genre: Educational Fantasy RPG, Platform: Web Browser).
  - Legal & support links: **Terms of Service**, **Privacy Policy**, **Contact Us**.
  - Copyright notice.
- **Dedicated Legal Pages:**
  - `/privacy-policy`: Clear, readable Privacy Policy covering user accounts, uploaded study materials/PDFs, analytics/cookies, and data deletion.
  - `/terms-of-service`: Clear, readable Terms & Conditions covering acceptable use, user-uploaded study content, intellectual property, and service availability.

---

## 4. Progress Tracker
- [x] Inspect workspace assets & define architecture
- [x] Create `prd.md`
- [x] Phase 1: Scaffold Vite + React + TS + Tailwind project & build Header + Hero Section
- [x] Phase 2: Build News & Updates Section
- [x] Phase 3: Build Character Showcase Section
- [x] Phase 4: Build Features Section
- [x] Phase 5: Build Ending CTA, Footer, Privacy Policy & Terms of Service pages
