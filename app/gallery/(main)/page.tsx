"use client";

import GalleryView from "@/components/gallery/GalleryView";
import { useGallery } from "@/utils/galleryContext";

export default function GalleryPage() {
  const { filters, sort } = useGallery();
  return (
    <main className="min-h-screen p-4 bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950">
      <GalleryView filters={filters} sort={sort} />
    </main>
  );
}
