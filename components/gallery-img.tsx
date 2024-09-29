import { generateFullWallpaper, generateWallpaperPreview } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCallback } from "react";
import type { WallpaperConfig, WallpaperDB } from "@/lib/types";

export default function GaleryImg({ wallpaper }: { wallpaper: WallpaperDB }) {
  const handleDownload = useCallback((wallpaper: WallpaperConfig) => {
    const fullWallpaper = generateFullWallpaper(wallpaper);
    const link = document.createElement("a");
    link.href = fullWallpaper;
    link.download = `wallpaper.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="snap-start snap-always w-full shadow-sm h-[80vh] flex flex-col border rounded-lg overflow-hidden sm:h-auto sm:aspect-[9/16]">
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
  );
}
