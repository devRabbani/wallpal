import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return [...Array(8)].map((_, i) => (
    <Skeleton key={i} className="w-full h-full aspect-[9/16] rounded-lg" />
  ));
}
