"use client";

import Sort from "@/components/gallery/Sort";
import FilterGallery from "@/components/gallery/Filter";
import Navbar from "@/components/common/Navbar";
// for filter
import { useState } from "react";
import { type Filters } from "@/types/components";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // filter
  const [filters, setFilters] = useState<Filters>({
    category: [],
    culture: [],
    material: [],
    period: [-4000, 2020],
  });

  return (
    <section
      id="gallery-wrapper"
      className="min-h-screen bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950"
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <div
          id="gallery-actions-wrapper"
          className="flex flex-col sm:flex-col md:flex-row lg:flex-row mt-20 mb-5 sm:items-center sm:justify-between gap-4 mx-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-left">
            Browse our collection
          </h1>
          <div id="gallery-actions" className="flex flex-row flex-wrap gap-3">
            <Sort />
            <FilterGallery filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
    </section>
  );
}
