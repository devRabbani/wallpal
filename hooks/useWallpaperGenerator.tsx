import { WallpaperConfig } from "@/lib/types";
import {
  generateBackground,
  getOptimizedContext,
  renderText,
} from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useWallpaperGenerator(initialConfig: WallpaperConfig) {
  const [config, setConfig] = useState<WallpaperConfig>(initialConfig);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<ImageData | null>(null);

  const updateConfig = useCallback((updates: Partial<WallpaperConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const regenerateBackground = () => {
    updateConfig({ seed: Math.floor(Math.random() * 1000000) });
  };

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = getOptimizedContext(canvas);
      if (ctx) {
        generateBackground(ctx, config);
        backgroundImageRef.current = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        renderText(ctx, config);
      }
    }
  }, [config.seed]);

  const updateTextOnly = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && backgroundImageRef.current) {
      const ctx = getOptimizedContext(canvas);
      if (ctx) {
        ctx.putImageData(backgroundImageRef.current, 0, 0);
        renderText(ctx, config);
      }
    }
  }, [config.text, config.fontSize, config.textPosition, config.align]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  useEffect(() => {
    if (backgroundImageRef.current) {
      updateTextOnly();
    }
  }, [updateTextOnly]);

  return {
    config,
    updateConfig,
    regenerateBackground,
    canvasRef,
    isLoading,
    setIsLoading,
  };
}
