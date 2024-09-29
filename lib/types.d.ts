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

export type WallpaperDB = WallpaperConfig & {
  id: number;
  createdAt: Date;
  hash: string;
};

export type WallpapersResponse =
  | {
      wallpapers: WallpaperDB[];
      nextCursor: number | null;
      hasMore: boolean;
    }
  | {
      error: string;
    };

export type DownloadButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  className?: string;
};

export type FiltersProps = {
  config: WallpaperConfig;
  updateConfig: (updates: Partial<WallpaperConfig>) => void;
};

export type SelectFieldProps = {
  label: string;
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
};

export type SliderFieldProps = {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onValueChange: (value: number) => void;
};

export type CustomColorPickerProps = {
  customColor1: string;
  customColor2: string;
  setCustomColor1: (color: string) => void;
  setCustomColor2: (color: string) => void;
};
