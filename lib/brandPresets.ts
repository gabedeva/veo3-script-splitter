export type BrandPreset = {
  name: string;
  environment: string;
  mood: string;
  lighting: string;
  cameraStyle: string;
  colorTone: string;
  presenter?: string;
};

export const BRAND_PRESETS: Record<string, BrandPreset> = {
  oladprints: {
    name: "Oladprints",
    environment: "modern Nigerian print shop in Ibadan",
    mood: "professional, fast, reliable",
    lighting: "bright cinematic lighting",
    cameraStyle: "smooth gimbal shots, slow push-ins",
    colorTone: "clean whites and blues",
    presenter: "confident Nigerian female presenter",
  },

  generic: {
    name: "Generic",
    environment: "modern workspace",
    mood: "cinematic",
    lighting: "soft cinematic lighting",
    cameraStyle: "steady cinematic shots",
    colorTone: "neutral tones",
  },
};
