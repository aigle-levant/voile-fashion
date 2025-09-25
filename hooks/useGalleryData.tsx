"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { type GalleryCardProps, type Filters } from "@/types/components";

export function useGalleryData(
  filters: Filters,
  sort: "ascending" | "descending"
) {
  const [posts, setPosts] = useState<GalleryCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        let query = supabase.from("gallery").select("*");

        if (filters.material.length)
          query = query.in("material", filters.material);
        if (filters.culture.length)
          query = query.in("culture", filters.culture);
        if (filters.category.length)
          query = query.in("category", filters.category);

        query = query
          .gte("period", filters.period[0])
          .lte("period", filters.period[1]);

        query = query.order("title", { ascending: sort === "ascending" });

        const { data, error: dbError } = await query;
        if (dbError) throw new Error(dbError.message);

        const gallery: GalleryCardProps[] = (data ?? []).map((item) => ({
          id: item.id,
          image_url: item.image_url,
          title: item.title,
          category: item.category,
          culture: item.culture,
          period: item.period,
          material: item.material,
        }));

        setPosts(gallery);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [filters, sort]);

  return { posts, error, isLoading };
}
