export interface CharacterAnimation {
  label: string;
  jsonUrl: string;
  imageUrl: string;
  fps: number;
}

export interface CharacterProfile {
  id: string;
  name: string;
  watermark: string;
  role: string;
  faction: string;
  accentColor: string;
  accentSoft: string;
  portraitUrl: string;
  voiceUrl?: string;
  voiceLabel?: string;
  animations: CharacterAnimation[];
  backstory: string[];
}

export const CHARACTERS: CharacterProfile[] = [
  {
    id: "olan",
    name: "Olan",
    watermark: "OLAN",
    role: "Protagonist · Crescent Mage",
    faction: "Savannah Wanderer",
    accentColor: "#3D7EDB",
    accentSoft: "#DCEBFC",
    portraitUrl: "/assets/characters/profiles/Olan profile.png",
    animations: [
      {
        label: "Idle",
        jsonUrl: "/assets/characters/olan-idle/spritesheet.json",
        imageUrl: "/assets/characters/olan-idle/spritesheet.png",
        fps: 8,
      },
      {
        label: "Walk",
        jsonUrl: "/assets/characters/mc-walk/spritesheet.json",
        imageUrl: "/assets/characters/mc-walk/spritesheet.png",
        fps: 10,
      },
    ],
    backstory: [
      "An ordinary student who got pulled into the hand-drawn realm of Nerdius while cramming for finals. Armed with his glowing Crescent Staff, Olan channels knowledge from real lecture notes into spells.",
      "Though he used to dread thick textbooks and endless slides, every chapter he conquers across the Savannah makes him sharper, braver, and one step closer to mastering his own fate.",
    ],
  },
  {
    id: "nerd",
    name: "Nerd",
    watermark: "NERD",
    role: "Guide · Lecture Alchemist",
    faction: "Scholar's Guild",
    accentColor: "#E08B15",
    accentSoft: "#FFF0CC",
    portraitUrl: "/assets/characters/profiles/Nerd profile.png",
    voiceUrl: "/assets/audio/nerd-voice-clip.m4a",
    voiceLabel: "Play Voice",
    animations: [
      {
        label: "Idle",
        jsonUrl: "/assets/characters/nerd-idle/spritesheet.json",
        imageUrl: "/assets/characters/nerd-idle/spritesheet.png",
        fps: 7.5,
      },
      {
        label: "Well Actually",
        jsonUrl: "/assets/characters/nerd-well-actually/spritesheet.json",
        imageUrl: "/assets/characters/nerd-well-actually/spritesheet.png",
        fps: 8,
      },
    ],
    backstory: [
      "Olan's floating, bowtie-wearing companion with an insatiable appetite for PDFs and lecture slides. Feed Nerd your study notes and he'll cheerfully transmute them into full RPG encounters.",
      "He can't resist chiming in with a dramatic 'Well, actually...' whenever you miss a question—yet deep down, he's your most loyal cheerleader on the road to an A+.",
    ],
  },
  {
    id: "hannah",
    name: "Hannah",
    watermark: "HANNAH",
    role: "Boss · The Scrolling Siren",
    faction: "Distraction Syndicate",
    accentColor: "#468996",
    accentSoft: "#D9EFF2",
    portraitUrl: "/assets/characters/profiles/Hannah profile.png",
    voiceUrl: "/assets/audio/hannah-voice-clip.m4a",
    voiceLabel: "Play Voice",
    animations: [
      {
        label: "Idle",
        jsonUrl: "/assets/characters/hannah-idle/spritesheet.json",
        imageUrl: "/assets/characters/hannah-idle/spritesheet.png",
        fps: 7,
      },
      {
        label: "Photo Flash",
        jsonUrl: "/assets/characters/hannah-photo-attack/spritesheet.json",
        imageUrl: "/assets/characters/hannah-photo-attack/spritesheet.png",
        fps: 10,
      },
    ],
    backstory: [
      "A sleek, three-lensed smartphone entity draped in a crisp blazer. Hannah thrives on endless notifications, late-night doomscrolling, and blinding camera-flash ambushes.",
      "She tests every student's focus in battle—only adventurers who truly understand their study material can resist her distractions and break her streak.",
    ],
  },
  {
    id: "snarger",
    name: "Snarger",
    watermark: "SNARGER",
    role: "Foe · The Cable Serpent",
    faction: "Savannah Wilds",
    accentColor: "#4C8C4A",
    accentSoft: "#DFF2DC",
    portraitUrl: "/assets/characters/profiles/Snarger profile.png",
    voiceUrl: "/assets/audio/snarger-voice-clip.m4a",
    voiceLabel: "Play Voice",
    animations: [
      {
        label: "Idle",
        jsonUrl: "/assets/characters/snarger-idle/spritesheet.json",
        imageUrl: "/assets/characters/snarger-idle/spritesheet.png",
        fps: 8,
      },
    ],
    backstory: [
      "Part tangled charger cable, part hissing savannah serpent. Snarger coils around procrastinators whose batteries are forever stuck at 2% right before a deadline.",
      "Fast, coiled, and surprisingly territorial—answering quiz combos swiftly is the cleanest way to untangle this sneaky ambush predator.",
    ],
  },
];
