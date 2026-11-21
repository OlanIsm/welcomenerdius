export interface FeatureSlide {
  id: string;
  tag: string;
  title: string;
  description: string;
  bgImage: string;
  foregroundImage: string;
  foregroundAlt: string;
  accentColor: string;
}

export const FEATURES: FeatureSlide[] = [
  {
    id: "pdf-to-quest",
    tag: "Core Magic",
    title: "Turn Lecture Notes Into RPG Quests",
    description:
      "Upload your PDFs or class slides and watch Nerd transform dry chapters into playful adventure quizzes.",
    bgImage: "/assets/features/floating-island.webp",
    foregroundImage: "/assets/features/nerd-eat-pdf.gif",
    foregroundAlt: "Nerd enthusiastically eating a PDF lecture document",
    accentColor: "#FFB830",
  },
  {
    id: "quiz-combat",
    tag: "RPG Battles",
    title: "Answer Smart, Cast Crescent Spells",
    description:
      "Chain right answers to power up Olan's staff and outsmart tricky foes like Hannah and Snarger.",
    bgImage: "/assets/news/merlins-room.webp",
    foregroundImage: "/assets/features/mc.webp",
    foregroundAlt: "Olan wielding his glowing Crescent Staff",
    accentColor: "#5AA9F8",
  },
  {
    id: "hand-drawn-worlds",
    tag: "Cozy Visuals",
    title: "Soothing Hand-Drawn Fantasy Realms",
    description:
      "Journey across lush Savannahs, Fibonacci deserts, and volcanic peaks with smooth cartoon animations.",
    bgImage: "/assets/features/oceanlandscape.png",
    foregroundImage: "/assets/features/island-kingdom.webp",
    foregroundAlt: "Hand-drawn Kingdom island with math symbol trees",
    accentColor: "#8BE04E",
  },
  {
    id: "grades-badges",
    tag: "Progression",
    title: "Earn A+ Grades & Tiered Badges",
    description:
      "Build study streaks, unlock 5-tier Scroll Scholar badges, and feel your real knowledge level up.",
    bgImage: "/assets/features/pub.webp",
    foregroundImage: "/assets/features/grade-a-plus.webp",
    foregroundAlt: "A+ Grade emblem reward",
    accentColor: "#FF7B54",
  },
];
