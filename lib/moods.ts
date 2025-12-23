export const MOODS = [
  "professional",
  "cinematic",
  "urgent",
  "friendly",
  "luxury",
  "energetic",
  "calm",
] as const;

export type Mood = (typeof MOODS)[number];
