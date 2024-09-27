"use client";

import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  DESKTOP_HEIGHT,
  DESKTOP_WIDTH,
  MOBILE_HEIGHT,
  MOBILE_WIDTH,
} from "@/lib/constants";

export default function GeneratePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateWallpaper = () => {};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      //    const width =
      //      config.wallpaperType === "mobile" ? MOBILE_WIDTH : DESKTOP_WIDTH;
      //    const height =
      //      config.wallpaperType === "mobile" ? MOBILE_HEIGHT : DESKTOP_HEIGHT;

      canvas.width = MOBILE_WIDTH;
      canvas.height = MOBILE_HEIGHT;
    }
  }, []);

  return (
    <div>
      <h1>Generate Page</h1>
      <div>
        <div className="w-full aspect-[9/16] max-h-[70vh] relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain border border-gray-300 rounded-lg"
          />
        </div>
        <Button className="mt-4 w-full">Generate</Button>
      </div>
    </div>
  );
}
