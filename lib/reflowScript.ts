const MAX_WORDS = 20;
const MIN_WORDS_WARNING = 5;

export function reflowScript(script: string) {
  const words = script
    .replace(/\n+/g, " ")
    .trim()
    .split(/\s+/);

  const scenes: {
    text: string;
    wordCount: number;
    awkward: boolean;
  }[] = [];

  let buffer: string[] = [];

  for (const word of words) {
    buffer.push(word);

    if (buffer.length === MAX_WORDS) {
      const text = buffer.join(" ");
      scenes.push({
        text,
        wordCount: buffer.length,
        awkward: buffer.length < MIN_WORDS_WARNING,
      });
      buffer = [];
    }
  }

  // leftover words flow naturally into final scene
  if (buffer.length) {
    scenes.push({
      text: buffer.join(" "),
      wordCount: buffer.length,
      awkward: buffer.length < MIN_WORDS_WARNING,
    });
  }

  return scenes;
}
