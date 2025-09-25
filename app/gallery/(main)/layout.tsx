"use client";

import Sort from "@/components/gallery/Sort";
import FilterGallery from "@/components/gallery/Filter";
import Navbar from "@/components/common/Navbar";
import { useGallery, GalleryProvider } from "@/utils/galleryContext";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GalleryProvider>
      <GalleryLayoutInner>{children}</GalleryLayoutInner>
    </GalleryProvider>
  );
}

function GalleryLayoutInner({ children }: { children: React.ReactNode }) {
  const { filters, setFilters, sort, setSort } = useGallery();

  return (
    <section className="min-h-screen bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950">
      <Navbar />

      <div className="max-w-7xl pt-32 mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Browse our collection</h1>
          <div className="flex flex-wrap gap-3">
            <Sort sort={sort} setSort={setSort} />
            <FilterGallery filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </section>
  );
}
