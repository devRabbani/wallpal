import Gallery from "@/components/gallery-page";
import { getWallpapers } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const res = await getWallpapers();
  console.log("res", res.wallpapers);
  return <Gallery initialWallpapers={res?.wallpapers ?? []} />;
}
