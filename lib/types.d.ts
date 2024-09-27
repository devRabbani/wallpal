export type AlignType = "center" | "left" | "right";
export type FillModeType = "auto" | "flat" | "gradient";
export type PaletteType =
  | "cool"
  | "warm"
  | "pastel"
  | "dark"
  | "grayscale"
  | "vibrant"
  | "custom";

export type WallpaperConfig = {
  text: string;
  palette: PaletteType;
  fillMode: FillModeType;
  customColor1: string;
  customColor2: string;
  textPosition: { x: number; y: number };
  fontSize: number;
  seed: number;
  align: AlignType;
  patternIntensity: number;
};
