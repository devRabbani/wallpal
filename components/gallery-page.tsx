"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import type { WallpaperDB } from "@/lib/types";
import { useInView } from "react-intersection-observer";
import { getWallpapers } from "@/lib/actions";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";
const GaleryImg = dynamic(() => import("./gallery-img"), { ssr: false });

export default function Gallery({
  initialWallpapers,
  initialNextCursor,
  initialHasMore,
}: {
  initialWallpapers: WallpaperDB[];
  initialNextCursor: number | null;
  initialHasMore: boolean;
}) {
  const [wallpapers, setWallpapers] =
    useState<WallpaperDB[]>(initialWallpapers);
  const [nextCursor, setNextCursor] = useState<number | null>(
    initialNextCursor
  );
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMore = async () => {
    setIsLoading(true);
    try {
      const wallpaperRes = await getWallpapers(nextCursor);
      console.log("wallpaperRes fetched", wallpaperRes);
      if ("error" in wallpaperRes) return toast.error(wallpaperRes.error);

      setWallpapers((prev) => [...prev, ...wallpaperRes.wallpapers]);
      setNextCursor(wallpaperRes.nextCursor);
      setHasMore(wallpaperRes.hasMore);
    } catch (error: any) {
      console.log("Fetch More", error?.message);
      toast.error("Error fetching more wallpapers");
    } finally {
      setIsLoading(false);
    }
  };

  const { ref, inView } = useInView({ initialInView: false, threshold: 0.5 });

  useEffect(() => {
    if (inView && !isLoading) fetchMore();
  }, [inView]);

  return (
    <>
      {wallpapers.map((wallpaper) => (
        <Suspense>
          <GaleryImg key={wallpaper.id} wallpaper={wallpaper} />
        </Suspense>
      ))}
      {hasMore ? (
        <Button
          ref={ref}
          className="mx-auto w-[5.5rem] block my-2 col-span-full"
          variant={"outline"}
          size={"sm"}
        >
          {isLoading ? (
            <LoaderCircle className="h-4 w-4 mx-auto animate-spin" />
          ) : (
            "Load More"
          )}
        </Button>
      ) : (
        <p className="col-span-full mx-auto my-3 mb-5 text-muted-foreground ">
          Nothing left to show now
        </p>
      )}
    </>
  );
}
