export type NewsCategory = "important" | "news" | "notice";

export interface NewsItem {
  id: string;
  category: NewsCategory;
  date: string;
  title: string;
  summary: string;
  details: string[];
  bannerType: "mascot" | "image";
  bannerImage?: string;
  bannerOverlayImage?: string;
  bannerFit?: "cover" | "contain";
  bannerHeadline?: string;
}

export interface CommunityEvent {
  id: string;
  status: string;
  timeRemaining: string;
  title: string;
  description: string;
  bannerImage: string;
  badgeImage: string;
}

export const NEWS_TABS: { id: NewsCategory; label: string }[] = [
  { id: "important", label: "Important" },
  { id: "news", label: "News" },
  { id: "notice", label: "Notice" },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "v1-1-leaderboard-quests-qol",
    category: "important",
    date: "2026.11.23",
    title: "Nerdius v1.1 Update — Live Leaderboard, Daily & Weekly Quests, PDF QoL & Language Setting!",
    summary:
      "Compete on the hourly Leaderboard, claim Quest milestone chests, enjoy smoother PDF uploads & Language Settings, plus 300 free Gems in your Mail!",
    details: [
      "New Live Leaderboard across Adventure Cleared, Challenge Cleared, Highest Streak, and XP — updated every hour with clickable player Namecard & Badges.",
      "New Daily & Weekly Quest Board with milestone reward chests and one-tap Claim All.",
      "PDF Upload Quality-of-Life improvements for smoother scroll forging and clearer progress feedback.",
      "New Language Setting support so you can tailor your study experience to your preferred language.",
      "Compact Profile with 3 selectable character profiles (Olan, Hannah, Snagger), Daily Chapter Streak, and 300 Gems waiting in your in-game Mail!",
    ],
    bannerType: "mascot",
    bannerHeadline: "v1.1 UPDATE",
  },
  {
    id: "savannah-launch",
    category: "important",
    date: "2026.11.21",
    title: "Nerdius Official Launch — Turn Any Lecture Note Into an RPG Quest!",
    summary:
      "Upload your PDFs or study notes and adventure across the hand-drawn Savannah with Nerd and friends.",
    details: [
      "Upload lecture slides or PDFs directly inside Nerdius to generate custom adventure quizzes.",
      "Explore the Savannah realm with smooth hand-drawn animations and relaxing RPG audio.",
      "Track your mastery with grades, streaks, and collectible tier badges.",
    ],
    bannerType: "mascot",
    bannerHeadline: "NOTICE",
  },
  {
    id: "privacy-terms-live",
    category: "important",
    date: "2026.11.18",
    title: "Player Data Safety & Lecture Upload Privacy Guidelines",
    summary:
      "Your uploaded study materials stay private to your adventure sessions and are never shared publicly.",
    details: [
      "All uploaded study notes are used strictly to generate your personal quiz encounters.",
      "Dedicated Privacy Policy and Terms of Service pages are available directly from this portal.",
    ],
    bannerType: "mascot",
    bannerHeadline: "UPDATE",
  },
  {
    id: "new-characters-preview",
    category: "news",
    date: "2026.11.15",
    title: "Meet Your Companions: Nerd, Hannah, Olan & Snarger!",
    summary:
      "Every companion brings unique attack animations, personality, and study encouragement to your party.",
    details: [
      "Unlock companions as you progress through your uploaded study chapters.",
      "Each character features hand-drawn idle and combat animations crafted frame by frame.",
    ],
    bannerType: "image",
    bannerImage: "/assets/features/floating-island.webp",
  },
  {
    id: "badge-tiers-update",
    category: "news",
    date: "2026.11.10",
    title: "New Achievement Badges: Scroll Scholar & Keep Up Tiers 1–5",
    summary:
      "Show off your study consistency with five shiny hand-drawn tiers across six achievement categories.",
    details: [
      "Earn Scroll Scholar by converting lecture notes into completed quests.",
      "Maintain your study streak to level up your Keep Up badge all the way to Tier 5.",
    ],
    bannerType: "image",
    bannerImage: "/assets/news/badges.webp",
    bannerFit: "contain",
  },
  {
    id: "pdf-parser-v12",
    category: "notice",
    date: "2026.11.14",
    title: "Notice on v1.2 Quiz Generation Speed & Mobile Performance",
    summary:
      "Faster lecture parsing, smoother battle transitions, and lighter compressed assets for mobile browsers.",
    details: [
      "Reduced average PDF-to-Quest generation wait time by over 35%.",
      "Optimized savannah parallax and character spritesheets for silky 60fps gameplay on phones.",
    ],
    bannerType: "image",
    bannerImage: "/assets/news/merlins-room.webp",
    bannerOverlayImage: "/assets/news/royal-armor.webp",
  },
  {
    id: "scheduled-maintenance",
    category: "notice",
    date: "2026.11.06",
    title: "Completed Server Tuning & Save Sync Improvements",
    summary:
      "Progress, badges, and quest history now sync more reliably when switching between desktop and mobile.",
    details: [
      "No downtime is currently scheduled — Nerdius is live and ready to play.",
      "If you spot a bug, reach out anytime via our community Discord or Contact Us.",
    ],
    bannerType: "image",
    bannerImage: "/assets/news/merlins-room.webp",
    bannerOverlayImage: "/assets/news/royal-armor.webp",
  },
];

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "scroll-scholar-event",
    status: "In Progress",
    timeRemaining: "Season 1",
    title: "[Study Event] Scroll Scholar Challenge",
    description:
      "Upload your toughest lecture notes, conquer 5 adventure quizzes with an A grade, and claim your Tier 5 Scroll Scholar badge!",
    bannerImage: "/assets/features/floating-island.webp",
    badgeImage: "/assets/news/badge-scholar.webp",
  },
  {
    id: "pdf-adventure-event",
    status: "Ongoing",
    timeRemaining: "Open to All",
    title: "[Community] Share Your Funniest Nerd Moment",
    description:
      "Got roasted by Nerd's 'Well Actually' during a quiz battle? Share your screenshot with fellow adventurers in our community!",
    bannerImage: "/assets/news/merlins-room.webp",
    badgeImage: "/assets/news/pdf-icon.webp",
  },
];
