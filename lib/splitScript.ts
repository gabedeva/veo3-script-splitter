// import { BrandPreset } from "./brandPresets";
import { reflowScript } from "./reflowScript";
import { generateVisualPrompt } from "./visualPrompt";

const MAX_WORDS = 20;
const AWKWARD_MIN_WORDS = 5;

function smartSplitSentence(sentence: string): string[] {
  const words = sentence.trim().split(/\s+/);

  // If already safe, return as-is
  if (words.length <= MAX_WORDS) return [sentence.trim()];

  // Step 1: Try comma-based split
  const commaParts = sentence.split(/,(?!\d)/).map(p => p.trim());

  const chunks: string[] = [];
  let buffer: string[] = [];

  function flushBuffer() {
    if (buffer.length) {
      chunks.push(buffer.join(" "));
      buffer = [];
    }
  }

  for (const part of commaParts) {
    const partWords = part.split(/\s+/);

    if (buffer.length + partWords.length <= MAX_WORDS) {
      buffer.push(part);
    } else {
      flushBuffer();

      // Still too big → hard split
      if (partWords.length > MAX_WORDS) {
        for (let i = 0; i < partWords.length; i += MAX_WORDS) {
          chunks.push(partWords.slice(i, i + MAX_WORDS).join(" "));
        }
      } else {
        buffer.push(part);
      }
    }
  }

  flushBuffer();
  return chunks;
}

export function splitScriptForVeo(
  script: string,
  brandConfig: {
    brandName: string;
    environment: string;
    mood: string;
  },
  {
    mode = "normal", wordsPerSecond = 2.5,
  }: {
    mode?: "normal" | "nano";
    wordsPerSecond?: number
  }
) {
  const reflowed = reflowScript(script);

  return reflowed.map((scene, index) => ({
    scene: index + 1,
    dialogue: scene.text,
    wordCount: scene.wordCount,
    awkward: scene.awkward,
    visualPrompt: generateVisualPrompt(
      scene.text,
      brandConfig,
      mode
    ),
  }));
}
