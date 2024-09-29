import Gallery from "@/components/gallery-page";
import { getWallpapers } from "@/lib/actions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Wallpal",
  description:
    "Browse through a collection of stunning wallpapers created with Wallpal. Get inspired and create your own unique designs.",
};

export default async function GalleryPage() {
  const wallpaperRes = await getWallpapers();

  if ("error" in wallpaperRes) return null;

  return (
    <Gallery
      initialWallpapers={wallpaperRes.wallpapers}
      initialNextCursor={wallpaperRes.nextCursor}
      initialHasMore={wallpaperRes.hasMore}
    />
  );
}
