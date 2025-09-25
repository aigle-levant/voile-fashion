"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { type Filters } from "@/types/components";

interface GalleryContextType {
  filters: Filters;
  setFilters: (f: Filters) => void;
  sort: "ascending" | "descending";
  setSort: (s: "ascending" | "descending") => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    category: [],
    culture: [],
    material: [],
    period: [-4000, 2020],
  });
  const [sort, setSort] = useState<"ascending" | "descending">("ascending");

  return (
    <GalleryContext.Provider value={{ filters, setFilters, sort, setSort }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery must be used within GalleryProvider");
  return ctx;
}
