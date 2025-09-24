"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { type GalleryCardProps } from "@/types/components";

export function useGalleryData() {
  const [posts, setPosts] = useState<GalleryCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        const { data: items, error: dbError } = await supabase
          .from("gallery")
          .select("*")
          .order("id", { ascending: true });

        if (dbError) throw new Error(dbError.message);

        const gallery: GalleryCardProps[] = items.map((item) => ({
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
  }, []);

  return { posts, error, isLoading };
}
