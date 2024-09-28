"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

import { WallpaperConfig } from "@/lib/types";
import {
  generateWallpaperPreview,
  generateFullWallpaper,
  cn,
} from "@/lib/utils";
import Image from "next/image";
import moment from "moment";
import { useInView } from "react-intersection-observer";
import GaleryImg from "./gallery-img";

const heightOptions = [350, 500];

export default function Gallery({
  initialWallpapers,
}: {
  initialWallpapers: any[];
}) {
  const [wallpapers, setWallpapers] = useState<any[]>(initialWallpapers);

  const fetchMore = () => {};

  const { ref, inView } = useInView({ initialInView: false, threshold: 0.5 });
  console.count("ssss");

  useEffect(() => {
    if (inView) fetchMore();
  }, [inView]);
  console.log("Inview", wallpapers);

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
        {wallpapers.map((wallpaper) => (
          <GaleryImg key={wallpaper.id} wallpaper={wallpaper} />
        ))}
        <Button
          // ref={ref}
          className="mx-auto block my-2 col-span-full"
          variant={"outline"}
          size={"sm"}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}
