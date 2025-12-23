// import { BrandPreset } from "./brandPresets";

export function generateVisualPrompt(
  dialogue: string,
  {
    brandName,
    environment,
    mood,
  }: {
    brandName: string;
    environment: string;
    mood: string;
  },
  mode: "normal" | "nano"
) {
  if (mode === "nano") {
    return `${brandName} presenter, ${environment}, ${mood}, cinematic`;
  }

  return `
Presenter speaking to camera for ${brandName}.
Environment: ${environment}.
Mood: ${mood}.
Lighting: cinematic lighting.
Camera: smooth gimbal shots.
Dialogue context: ${dialogue}
  `.trim();
}
