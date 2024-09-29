import { Skeleton } from "@/components/ui/skeleton";

export const GalleryImgSkeleton = () => {
  return <Skeleton className="w-full h-full aspect-[9/16] rounded-lg" />;
};

export default function LoadingPage() {
  return [...Array(8)].map((_, i) => <GalleryImgSkeleton key={i} />);
}
