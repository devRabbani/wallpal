import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { colorPalettes } from "./constants";
import { AlignType, FillModeType, PaletteType, WallpaperConfig } from "./types";

export const IMAGE_WIDTH = 1440;
export const IMAGE_HEIGHT = 2560;
export const HALF_IMAGE_WIDTH = IMAGE_WIDTH / 2;
export const HALF_IMAGE_HEIGHT = IMAGE_HEIGHT / 2;
export const IMAGE_PADDING = 100;
export const PREVIEW_WIDTH = 360;
export const PREVIEW_HEIGHT = 640;


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function selectColors(
  palette: PaletteType,
  fillMode: FillModeType,
  customColor1: string,
  customColor2: string,
  random: () => number
) {
  if (palette === "custom") {
    return [customColor1, customColor2];
  }
  const colorCount = fillMode === "flat" ? 1 : random() < 0.5 ? 2 : 3;
  const selectedColorPalette = colorPalettes[palette];
  return [...selectedColorPalette]
    .sort(() => random() - 0.5)
    .slice(0, colorCount);
}

function createGradient(
  ctx: CanvasRenderingContext2D,
  selectedColors: string[],
  random: () => number
) {
  const gradientType = random() < 0.5 ? "linear" : "radial";
  let gradient;

  if (gradientType === "linear") {
    const angle = random() * 360;
    const startX =
      HALF_IMAGE_WIDTH + HALF_IMAGE_WIDTH * Math.cos((angle * Math.PI) / 180);
    const startY =
      HALF_IMAGE_HEIGHT + HALF_IMAGE_HEIGHT * Math.sin((angle * Math.PI) / 180);
    const endX =
      HALF_IMAGE_WIDTH - HALF_IMAGE_WIDTH * Math.cos((angle * Math.PI) / 180);
    const endY =
      HALF_IMAGE_HEIGHT - HALF_IMAGE_HEIGHT * Math.sin((angle * Math.PI) / 180);
    gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  } else {
    const centerX =
      HALF_IMAGE_WIDTH + ((random() - 0.5) * IMAGE_WIDTH) / 2;
    const centerY =
      HALF_IMAGE_HEIGHT + ((random() - 0.5) * IMAGE_HEIGHT) / 2;
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      Math.max(IMAGE_WIDTH, IMAGE_HEIGHT) / 2
    );
  }

  selectedColors.forEach((color, index) => {
    gradient.addColorStop(index / (selectedColors.length - 1), color);
  });

  return gradient;
}

function applyBackground(
  ctx: CanvasRenderingContext2D,
  fillMode: FillModeType,
  selectedColors: string[],
  random: () => number
) {
  const isGradient =
    fillMode === "gradient" || (fillMode === "auto" && random() < 0.7);

  if (isGradient) {
    ctx.fillStyle = createGradient(ctx, selectedColors,random);
  } else {
    ctx.fillStyle = selectedColors[0];
  }

  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
}

function applyPattern(ctx: CanvasRenderingContext2D, patternIntensity: number,random: () => number) {
  const backgroundColor = getAverageColor(ctx);
  const patternColor = getPatternColor(backgroundColor);

  const patternFn =
    backgroundPatterns[Math.floor(random() * backgroundPatterns.length)];
  const pattern = patternFn(ctx, patternColor);

  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.globalAlpha = patternIntensity;
    ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
    ctx.globalAlpha = 1;
  }
}

function calculateTextXPosition(align: AlignType, xPercentage: number): number {
  const xPixels = (IMAGE_WIDTH * xPercentage) / 100;

  switch (align) {
    case "left":
      return Math.max(xPixels, IMAGE_PADDING);
    case "right":
      return Math.min(xPixels, IMAGE_WIDTH - IMAGE_PADDING);
    case "center":
    default:
      return Math.max(
        Math.min(xPixels, IMAGE_WIDTH - IMAGE_PADDING),
        IMAGE_PADDING
      );
  }
}

function setupTextRendering(ctx: CanvasRenderingContext2D, align: AlignType) {
  const backgroundColor = getAverageColor(ctx);
  const textColor = getContrastColor(backgroundColor);

  ctx.fillStyle = textColor;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.shadowColor =
    textColor === "#FFFFFF" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
  ctx.shadowBlur = 10;
}

function renderTextWithWrapping(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  maxWidth: number
) {
  ctx.font = `bold ${fontSize}px Arial`;
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  return lines;
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number
) {
  const maxWidth = IMAGE_WIDTH - IMAGE_PADDING * 2;
  const lines = renderTextWithWrapping(ctx, text, fontSize, maxWidth);

  ctx.font = `bold ${fontSize}px Arial`;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * fontSize * 1.2);
  });
}

function getAverageColor(ctx: CanvasRenderingContext2D) {
  const imageData = ctx.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
  let r = 0,
    g = 0,
    b = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    r += imageData.data[i];
    g += imageData.data[i + 1];
    b += imageData.data[i + 2];
  }

  const pixelCount = imageData.data.length / 4;
  r = Math.floor(r / pixelCount);
  g = Math.floor(g / pixelCount);
  b = Math.floor(b / pixelCount);

  return `rgb(${r},${g},${b})`;
}

function getContrastColor(color: string) {
  const rgb = color.match(/\d+/g);
  if (rgb) {
    const brightness =
      (parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114) /
      1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  }
  return "#000000";
}

function getPatternColor(backgroundColor: string) {
  const rgb = backgroundColor.match(/\d+/g);
  if (rgb) {
    const brightness =
      (parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114) /
      1000;
    return brightness > 128
      ? "rgba(0, 0, 0, 0.14)"
      : "rgba(255, 255, 255, 0.14)";
  }
  return "rgba(0, 0, 0, 0.14)";
}
// Patterns
const backgroundPatterns = [
  createDiagonalPattern,
  createDotPattern,
  createCrossPattern,
  createWavePattern,
  createCirclePattern,
  () => null, // No pattern option
];

// Pattern creation functions (unchanged)
function createDiagonalPattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = patternCanvas.height = 10;
  if (patternCtx) {
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 10);
    patternCtx.lineTo(10, 0);
    patternCtx.stroke();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

function createDotPattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = patternCanvas.height = 10;
  if (patternCtx) {
    patternCtx.fillStyle = color;
    patternCtx.beginPath();
    patternCtx.arc(5, 5, 1, 0, Math.PI * 2);
    patternCtx.fill();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

function createCrossPattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = patternCanvas.height = 10;
  if (patternCtx) {
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(5, 0);
    patternCtx.lineTo(5, 10);
    patternCtx.moveTo(0, 5);
    patternCtx.lineTo(10, 5);
    patternCtx.stroke();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

function createWavePattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = 20;
  patternCanvas.height = 10;
  if (patternCtx) {
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 5);
    patternCtx.quadraticCurveTo(5, 0, 10, 5);
    patternCtx.quadraticCurveTo(15, 10, 20, 5);
    patternCtx.stroke();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

function createCirclePattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = patternCanvas.height = 20;
  if (patternCtx) {
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.arc(10, 10, 5, 0, Math.PI * 2);
    patternCtx.stroke();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

export function generateBackground(
  ctx: CanvasRenderingContext2D,
  config: WallpaperConfig
) {
  const random = seededRandom(config.seed);

  // Background
  const selectedColors = selectColors(
    config.palette,
    config.fillMode,
    config.customColor1,
    config.customColor2,
    random
  );
  applyBackground(ctx, config.fillMode, selectedColors, random);

  // Pattern
  applyPattern(ctx, config.patternIntensity,random);
}

export function renderText(
  ctx: CanvasRenderingContext2D,
  config: WallpaperConfig
) {
  const calculatedFontSize =
    Math.min(IMAGE_WIDTH, IMAGE_HEIGHT) * (config.fontSize / 100);
  const x = calculateTextXPosition(config.align, config.textPosition.x);
  const y = (IMAGE_HEIGHT * config.textPosition.y) / 100;

  ctx.save();
  setupTextRendering(ctx, config.align);
  drawText(ctx, config.text, x, y, calculatedFontSize);
  ctx.restore();
}



export function generateWallpaperPreview(config: WallpaperConfig): string {
  const canvas = document.createElement('canvas');
  canvas.width = PREVIEW_WIDTH;
  canvas.height = PREVIEW_HEIGHT;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    const scaleFactor = PREVIEW_WIDTH / IMAGE_WIDTH;
    ctx.scale(scaleFactor, scaleFactor);
    
    generateBackground(ctx, config);
    renderText(ctx, config);
    
    return canvas.toDataURL('image/jpeg'); // Use JPEG for smaller file size
  }
  
  return '';
}

export function generateFullWallpaper(config: WallpaperConfig): string {
  const canvas = document.createElement('canvas');
  canvas.width = IMAGE_WIDTH;
  canvas.height = IMAGE_HEIGHT;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    generateBackground(ctx, config);
    renderText(ctx, config);
    return canvas.toDataURL('image/png');
  }
  
  return '';
}