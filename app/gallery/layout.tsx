import { cn } from "@/lib/utils";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="hidden sm:block mt-4 mb-5 text-2xl font-light">
        Generated Wallpapers
      </h2>
      <div
        className={cn(
          "grid gap-4 mt-2 rounded-lg",
          "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "snap-y snap-mandatory overflow-y-scroll h-[calc(100svh-3.25rem-0.5rem)]",
          "sm:snap-none sm:overflow-visible sm:h-auto"
        )}
      >
        {children}
      </div>
    </div>
  );
}
