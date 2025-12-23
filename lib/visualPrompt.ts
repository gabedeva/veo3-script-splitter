import { BrandPreset } from "./brandPresets";

export function generateVisualPrompt(
  dialogue: string,
  brand: BrandPreset,
  mode: "normal" | "nano"
) {
  if (mode === "nano") {
    return `${brand.presenter || "presenter"}, ${brand.environment}, ${brand.mood}, cinematic`;
  }

  return `
${brand.presenter || "Presenter"} speaking to camera.
Environment: ${brand.environment}.
Mood: ${brand.mood}.
Lighting: ${brand.lighting}.
Camera: ${brand.cameraStyle}.
Color tone: ${brand.colorTone}.
Dialogue context: ${dialogue}
  `.trim();
}
