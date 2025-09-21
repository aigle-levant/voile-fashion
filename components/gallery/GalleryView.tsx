"use client";

import { useGalleryData } from "@/hooks/useGalleryData";
import GalleryCard from "./GalleryCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryView() {
  const { posts, error, isLoading } = useGalleryData();

  // setup skeleton
  const skeletons = Array.from({ length: 6 }).map((_, idx) => (
    <div key={idx} className="flex flex-col space-y-3">
      <Skeleton className="h-[400px] w-full rounded-none" />
      {/* <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div> */}
    </div>
  ));

  // handle errors
  if (error) return <p>Failed to load gallery: {error}</p>;
  return (
    <div
      id="gallery-wrapper"
      className="bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {isLoading
          ? skeletons
          : posts.map((item) => (
              <GalleryCard
                key={item.id || item.title}
                image_url={item.image_url}
                title={item.title}
                category={item.category}
                culture={item.culture}
                period={item.period}
                material={item.material}
              />
            ))}
      </div>
    </div>
  );
}
