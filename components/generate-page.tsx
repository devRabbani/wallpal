"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { WallpaperConfig } from "@/lib/types";
import {
  generateBackground,
  getOptimizedContext,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  renderText,
} from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import Filters from "./filters";
import { Download, SlidersHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function GeneratePage() {
  const [config, setConfig] = useState<WallpaperConfig>({
    text: "",
    palette: "pastel",
    fillMode: "auto",
    customColor2: "#C82E50",
    customColor1: "#E1DA42",
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
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "wallpaper.png";
      link.click();
    }
  };

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = getOptimizedContext(canvas);
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
      const ctx = getOptimizedContext(canvas);
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
    <div className="mt-1 md:flex justify-center items-center md:py-3 md:mt-0  md:min-h-[calc(100svh-3.25rem)] gap-4 lg:gap-8">
      <div className="w-full h-[calc(100svh-3.25rem-0.25rem-4rem)] sm:w-fit sm:aspect-[9/16] sm:mx-auto md:h-[60svh] lg:h-[73svh] lg:min-h-[540px] relative md:mx-0">
        <canvas
          ref={canvasRef}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          className="w-full h-full object-cover border bg-secondary border-gray-300 rounded-lg"
        />
        <button
          onClick={downloadWallpaper}
          className="absolute bottom-1.5 rounded-md left-1.5 backdrop-blur-md bg-background/30 p-2.5 md:hidden"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>
      <div className="w-full h-fit max-w-xl">
        <Card className="hidden md:block mb-3">
          <CardHeader className="pb-2">
            <CardTitle>Customize</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              dolorum suscipit cumque mollitia voluptate at officiis, nihil
              error doloremque possimus!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Filters config={config} updateConfig={updateConfig} />
          </CardContent>
          <CardFooter className="space-x-2 mt-5">
            <Button onClick={downloadWallpaper} size="lg" variant="secondary">
              <Download className="h-4 w-4 mt-px mr-2" />
              Download
            </Button>
            <Button size="lg" onClick={regenerateBackground}>
              Regenerate
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-2 items-center gap-2  bg-background h-16 md:hidden">
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
    </div>
  );
}
