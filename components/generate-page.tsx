"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  DESKTOP_HEIGHT,
  DESKTOP_WIDTH,
  MOBILE_HEIGHT,
  MOBILE_WIDTH,
} from "@/lib/constants";
import { FillModeType, PaletteType, WallpaperConfig } from "@/lib/types";
import {
  generateBackground,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  renderText,
} from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import Filters from "./filters";
import { Download, DownloadIcon, SlidersHorizontal } from "lucide-react";

export default function GeneratePage() {
  const [config, setConfig] = useState<WallpaperConfig>({
    text: "",
    palette: "pastel",
    fillMode: "auto",
    customColor1: "#000000",
    customColor2: "#ffffff",
    textPosition: { x: 50, y: 50 },
    fontSize: 5,
    seed: Math.floor(Math.random() * 1000000),
    align: "center",
    patternIntensity: 0.1,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<ImageData | null>(null);

  const updateConfig = (updates: Partial<WallpaperConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const regenerateBackground = () => {
    updateConfig({ seed: Math.floor(Math.random() * 1000000) });
  };


  const downloadWallpaper = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'wallpaper.png'
      link.click()
    };
  }

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        generateBackground(ctx, config);
        // Store the background image data
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
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Restore the background
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

  return (
    <div className="mt-1">
      <div className="w-full h-[calc(100svh-3.25rem-0.25rem-4rem)] relative">
        <canvas
          ref={canvasRef}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          className="w-full h-full object-cover border bg-secondary border-gray-300 rounded-lg"
        />
        <button onClick={downloadWallpaper} className="absolute bottom-1.5 rounded-md left-1.5 backdrop-blur-md bg-background/30 p-2.5">
          <Download className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 items-center gap-2  bg-background- h-16">
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="lg" variant="secondary">
              <SlidersHorizontal className="h-4 w-4 mt-px mr-2" /> Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent className="pb-7">
            <DrawerHeader className="text-left">
              <DrawerTitle>Customize</DrawerTitle>
              <Filters config={config} updateConfig={updateConfig} />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>

        <Button size="lg" onClick={regenerateBackground}>
          Regenerate
        </Button>
      </div>
    </div>
  );
}
