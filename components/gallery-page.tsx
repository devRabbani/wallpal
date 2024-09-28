"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WallpaperConfig } from "@/lib/types";
import {
  generateWallpaperPreview,
  generateFullWallpaper,
  cn,
} from "@/lib/utils";
import Image from "next/image";
import moment from "moment";
import Masonry from "react-masonry-css";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useInView } from "react-intersection-observer";

// Sample data (replace this with actual data fetching from your database)
const sampleData: any[] = [
  {
    id: "1",
    text: "Hello World",
    palette: "pastel",
    fillMode: "gradient",
    customColor1: "#FF5733",
    customColor2: "#33FF57",
    textPosition: { x: 50, y: 50 },
    fontSize: 5,
    seed: 123456,
    align: "center",
    patternIntensity: 0.2,
    createdAt: new Date("2023-05-01").toISOString(),
  },
  {
    id: "2",
    text: "Awesome Wallpaper",
    palette: "dark",
    fillMode: "flat",
    customColor1: "#3357FF",
    customColor2: "#FF33F1",
    textPosition: { x: 30, y: 70 },
    fontSize: 6,
    seed: 789012,
    align: "left",
    patternIntensity: 0.1,
    createdAt: new Date("2023-05-02").toISOString(),
  },
  {
    id: "3",
    text: "Creative Design",
    palette: "warm",
    fillMode: "auto",
    customColor1: "#8B4513",
    customColor2: "#228B22",
    textPosition: { x: 70, y: 30 },
    fontSize: 4,
    seed: 345678,
    align: "right",
    patternIntensity: 0.3,
    createdAt: new Date("2023-05-03").toISOString(),
  },
  {
    id: "4",
    text: "",
    palette: "warm",
    fillMode: "auto",
    customColor1: "#8B4513",
    customColor2: "#228B22",
    textPosition: { x: 70, y: 30 },
    fontSize: 4,
    seed: 345678,
    align: "right",
    patternIntensity: 0.3,
    createdAt: new Date("2023-05-03").toISOString(),
  },
];
const heightOptions = [350, 500];

export default function Gallery() {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // In a real application, you would fetch data from your API here
    // For now, we'll use the sample data
    setWallpapers(
      sampleData.map((wallpaper) => ({
        ...wallpaper,
        height: heightOptions[Math.floor(Math.random() * heightOptions.length)],
      }))
    );
  }, []);

  const handleDownload = useCallback((wallpaper: WallpaperConfig) => {
    const fullWallpaper = generateFullWallpaper(wallpaper);
    const link = document.createElement("a");
    link.href = fullWallpaper;
    link.download = `wallpaper.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const fetchMore = () => {
    setWallpapers((prev) => [
      ...prev,
      ...sampleData.map((wallpaper) => ({
        ...wallpaper,
        height: heightOptions[Math.floor(Math.random() * heightOptions.length)],
      })),
    ]);
  };

  const breakpointColumnsObj = {
    default: 4,
    700: 2,
    500: 2,
  };
  const { ref, inView } = useInView({ initialInView: false, threshold: 0.5 });
  console.count("ssss");

  useEffect(() => {
    if (inView) fetchMore();
  }, [inView]);
  console.log("Inview", inView);

  return (
    <div>
      <h2 className="hidden sm:block mt-4 mb-5 text-2xl font-semibold">
        Generated Wallpapers
      </h2>
      <div
        className={cn(
          "grid gap-4 mt-2 rounded-lg",
          "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "snap-y snap-mandatory overflow-y-scroll h-[calc(100svh-3.25rem-0.5rem)]",
          "sm:snap-none sm:overflow-visible sm:h-auto"
        )}
      >
        {wallpapers.map((wallpaper, i) => (
          <div
            key={i}
            className="snap-start snap-always w-full shadow-sm h-[80vh] flex flex-col border rounded-lg overflow-hidden sm:h-auto sm:aspect-[9/16]"
          >
            <div className="relative w-full h-full">
              <Image
                src={generateWallpaperPreview(wallpaper)}
                alt="Wallpaper"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="bg-background h-fit py-1.5 px-2.5 flex items-center gap-2 justify-between">
              <p className="text-xs">{moment(wallpaper.createdAt).fromNow()}</p>
              <Button
                className=""
                size={"sm"}
                variant={"outline"}
                onClick={() => handleDownload(wallpaper)}
              >
                Download HD
              </Button>
            </div>
          </div>
        ))}
        <Button
          // ref={ref}
          className="mx-auto block my-2 col-span-full"
          variant={"outline"}
          size={"sm"}
        >
          Load More
        </Button>
      </div>{" "}
    </div>
  );
}
