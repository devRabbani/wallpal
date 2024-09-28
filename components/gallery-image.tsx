import Image from "next/image";

export default function GalleryImage({src}:{src:string}) {
    return         <div className="relative w-full h-[50%] bg-red-200 border rounded">
            <Image
              src={src}
              alt='Wallpaper'
              layout="fill"
              objectFit="contain"
            />
          </div>
}