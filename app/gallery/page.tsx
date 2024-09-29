import Gallery from "@/components/gallery-page";
import { getWallpapers } from "@/lib/actions";

export const dynamic = "force-dynamic";

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
