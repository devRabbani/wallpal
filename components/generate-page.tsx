"use client";

import { Button } from "./ui/button";
import type { DownloadButtonProps } from "@/lib/types";

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
import { saveWallpaper } from "@/lib/actions";
import { toast } from "sonner";
import { DEFAULT_CONFIG, IMAGE_HEIGHT, IMAGE_WIDTH } from "@/lib/constants";
import useWallpaperGenerator from "@/hooks/useWallpaperGenerator";

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  isLoading,
  className = "",
}) => (
  <Button
    disabled={isLoading}
    onClick={onClick}
    size="lg"
    variant="secondary"
    className={className}
  >
    <Download className="h-4 w-4 mt-px mr-2" />
    Download
  </Button>
);

export default function GeneratePage() {
  const {
    config,
    updateConfig,
    regenerateBackground,
    canvasRef,
    isLoading,
    setIsLoading,
  } = useWallpaperGenerator(DEFAULT_CONFIG);

  const downloadWallpaper = async () => {
    setIsLoading(true);
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `wallpaper_${Date.now()}.png`;
        link.click();
      }
      const res = await saveWallpaper(config);
      if (res?.error) return toast.error(res?.error);
    } catch (error: any) {
      console.error("Error downloading wallpaper:", error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-1 md:flex justify-center items-center md:py-3 md:mt-0 md:min-h-[calc(100svh-3.25rem)] gap-4 lg:gap-8">
      <div className="w-full h-[calc(100svh-3.25rem-0.25rem-4rem)] sm:w-fit sm:aspect-[9/16] sm:mx-auto md:h-[60svh] lg:h-[73svh] lg:min-h-[540px] relative md:mx-0">
        <canvas
          ref={canvasRef}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          className="w-full h-full object-cover border bg-secondary border-gray-300 rounded-lg"
        />
        <DownloadButton
          onClick={downloadWallpaper}
          isLoading={isLoading}
          className="absolute bottom-1.5 rounded-md left-1.5 backdrop-blur-md bg-background/30 p-2.5 md:hidden"
        />
      </div>
      <div className="w-full h-fit max-w-xl">
        <Card className="hidden md:block mb-3">
          <CardHeader className="pb-2">
            <CardTitle>Customize</CardTitle>
            <CardDescription>
              Easily customize your wallpaper! Adjust text, colors, and patterns
              to create a unique backdrop that reflects your style—bold or
              minimalist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Filters config={config} updateConfig={updateConfig} />
          </CardContent>
          <CardFooter className="space-x-2 mt-5">
            <DownloadButton onClick={downloadWallpaper} isLoading={isLoading} />
            <Button size="lg" onClick={regenerateBackground}>
              Regenerate
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-2 items-center gap-2 bg-background h-16 md:hidden">
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
