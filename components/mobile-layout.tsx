import { WallpaperConfig } from "@/lib/types";
import { generateFullWallpaper, generateWallpaperPreview } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCallback, useEffect } from "react";
import GalleryImage from "./gallery-image";
import { Download } from "lucide-react";



export type MobileLayoutProps = WallpaperConfig & { id: string,createdAt:string };


export default function MobileLayout({ wallpapers }: { wallpapers:MobileLayoutProps[] }) {
    
const handleDownload = useCallback((wallpaper: MobileLayoutProps) => {
    const fullWallpaper = generateFullWallpaper(wallpaper);
    const link = document.createElement('a');
    link.href = fullWallpaper;
    link.download = `wallpaper-${wallpaper.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);


  return <div className="space-y-2 rounded-lg h-[calc(100svh-4rem-0.5rem)] mt-2 overflow-y-scroll snap-y snap-mandatory">
  
    {wallpapers.map((wallpaper,i) => (
      <div key={i} className="snap-start w-full h-[85%] flex flex-col border-gray-300 border rounded-lg overflow-hidden">
        <div className="relative w-full h-full">
         <Image
             src={generateWallpaperPreview(wallpaper)} 
              alt='Wallpaper'
              layout="fill"
          objectFit="cover"
          
        />
        </div>
   
        <div className="bg-background h-fit z-50 relative backdrop-blur-lg py-1.5 px-2.5 flex items-center gap-2 justify-between">
          <p className="text-xs">{moment(wallpaper.createdAt).fromNow()}</p>
          <Button className="" size={'sm'} variant={"outline"} onClick={() => handleDownload(wallpaper)}>Download</Button>
        </div>
          </div>
    ))}
</div>


    return <div 
      className="h-[calc(100svh-4rem)] overflow-y-scroll snap-y snap-mandatory"
    >
      {wallpapers.map((wallpaper, index) => (
        <div 
          key={wallpaper.id} 
          className="h-full bg-yellow-300 w-full snap-start flex flex-col justify-center items-center p-4"
        >
      
          <GalleryImage src={generateWallpaperPreview(wallpaper)} />
        </div>
      ))}
    </div>
}