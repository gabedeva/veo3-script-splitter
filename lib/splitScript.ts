import { BrandPreset } from "./brandPresets";
import { generateVisualPrompt } from "./visualPrompt";

export type SplitMode = "normal" | "nano";

export function splitScriptForVeo(
  script: string,
  brand: BrandPreset,
  {
    wordsPerSecond = 2.25,
    durationSeconds = 8,
    mode = "normal",
  }: {
    wordsPerSecond?: number;
    durationSeconds?: number;
    mode?: "normal" | "nano";
  }
) {
  const maxWords =
    mode === "nano"
      ? 8
      : Math.round(wordsPerSecond * durationSeconds);

  const sentences =
    script.replace(/\n+/g, " ").match(/[^.!?]+[.!?]?/g) || [];

  const segments: string[] = [];
  let buffer: string[] = [];
  let count = 0;

  for (const sentence of sentences) {
    const words = sentence.trim().split(/\s+/);

    if (count + words.length <= maxWords) {
      buffer.push(sentence.trim());
      count += words.length;
    } else {
      if (buffer.length) segments.push(buffer.join(" "));
      buffer = [sentence.trim()];
      count = words.length;
    }
  }

  if (buffer.length) segments.push(buffer.join(" "));

  return segments.map((text, i) => ({
    scene: i + 1,
    duration: mode === "nano" ? "Nano" : "8s",
    dialogue: text,
    visualPrompt: generateVisualPrompt(text, brand, mode),
  }));
}
