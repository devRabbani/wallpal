"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { WallpaperDB } from "@/lib/types";
import { useInView } from "react-intersection-observer";
import { getWallpapers } from "@/lib/actions";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import GaleryImg from "./gallery-img";

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
  const [isMounted, setIsMounted] = useState(false);

  const fetchMore = async () => {
    if (isLoading || !hasMore) return; // extra safety

    setIsLoading(true);
    try {
      const wallpaperRes = await getWallpapers(nextCursor);
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

  const { ref, inView } = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (inView && !isLoading && hasMore) fetchMore();
  }, [inView]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {wallpapers.map((wallpaper) => (
        <GaleryImg key={wallpaper.id} wallpaper={wallpaper} />
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
