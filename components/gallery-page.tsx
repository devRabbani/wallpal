'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { WallpaperConfig } from '@/lib/types'
import { generateWallpaperPreview, generateFullWallpaper } from '@/lib/utils'
import Image from 'next/image'
import moment from 'moment'
import Masonry from 'react-masonry-css'
import MobileLayout, { MobileLayoutProps } from './mobile-layout'
import { useMediaQuery } from '@/hooks/use-media-query'

// Sample data (replace this with actual data fetching from your database)
const sampleData: (MobileLayoutProps)[] = [
  {
    id: '1',
    text: 'Hello World',
    palette: 'pastel',
    fillMode: 'gradient',
    customColor1: '#FF5733',
    customColor2: '#33FF57',
    textPosition: { x: 50, y: 50 },
    fontSize: 5,
    seed: 123456,
    align: 'center',
    patternIntensity: 0.2,
    createdAt: new Date('2023-05-01').toISOString(),
  },
  {
    id: '2',
    text: 'Awesome Wallpaper',
    palette: 'dark',
    fillMode: 'flat',
    customColor1: '#3357FF',
    customColor2: '#FF33F1',
    textPosition: { x: 30, y: 70 },
    fontSize: 6,
    seed: 789012,
    align: 'left',
    patternIntensity: 0.1,
    createdAt: new Date('2023-05-02').toISOString(),
  },
  {
    id: '3',
    text: 'Creative Design',
    palette: 'warm',
    fillMode: 'auto',
    customColor1: '#8B4513',
    customColor2: '#228B22',
    textPosition: { x: 70, y: 30 },
    fontSize: 4,
    seed: 345678,
    align: 'right',
    patternIntensity: 0.3,
    createdAt: new Date('2023-05-03').toISOString(),
    },
    {
    id: '4',
    text: '',
    palette: 'warm',
    fillMode: 'auto',
    customColor1: '#8B4513',
    customColor2: '#228B22',
    textPosition: { x: 70, y: 30 },
    fontSize: 4,
    seed: 345678,
    align: 'right',
    patternIntensity: 0.3,
    createdAt: new Date('2023-05-03').toISOString(),
  },
]
const heightOptions = [250, 300, 350];

export default function Gallery() {
  const [wallpapers, setWallpapers] = useState<MobileLayoutProps[]>([])
  const isDesktop = useMediaQuery('(min-width: 768px)')

useEffect(() => {
    // In a real application, you would fetch data from your API here
    // For now, we'll use the sample data
    setWallpapers(sampleData.map(wallpaper => ({
      ...wallpaper,
      height: heightOptions[Math.floor(Math.random() * heightOptions.length)]
    })))
  }, [])

  const handleDownload = useCallback((wallpaper: WallpaperConfig) => {
    const fullWallpaper = generateFullWallpaper(wallpaper);
    const link = document.createElement('a');
    link.href = fullWallpaper;
    link.download = `wallpaper.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 2,
    500: 2
  };

  return (
    <>
      
          <MobileLayout wallpapers={wallpapers }/>
      {/* <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto"
        columnClassName="px-1"
      >
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id} className="mb-4">
                <div className="relative" style={{ height: `${wallpaper.height}px` }}>
              <Image
                src={generateWallpaperPreview(wallpaper)}
                alt={`Wallpaper: ${wallpaper.text}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">{moment(wallpaper.createdAt).fromNow()}</span>
              <Button onClick={() => handleDownload(wallpaper)} size="sm">Download</Button>
            </div>
          </div>
        ))}
      </Masonry> */}
    </>
  )
}