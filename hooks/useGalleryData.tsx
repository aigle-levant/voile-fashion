"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import {
  type GalleryCardProps,
  type MetGalleryProps,
} from "@/types/components";

export function useGalleryData() {
  const [posts, setPosts] = useState<GalleryCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        const { data: items, error: supabaseError } = await supabase
          .from("gallery")
          .select("image_url, title, category, culture, period, material, id");
        if (supabaseError) setError(supabaseError.message);

        const supabaseGallery: GalleryCardProps[] =
          items?.map((item: GalleryCardProps, index: number) => ({
            id: item.id || `supabase-${index}`,
            image_url: item.image_url,
            title: item.title,
            category: item.category,
            culture: item.culture,
            period: item.period,
            material: item.material,
          })) || [];

        const metRes = await fetch("/api/met");
        const metJson = await metRes.json();
        const metItemsData: MetGalleryProps[] = metJson.data || [];

        const metGallery: GalleryCardProps[] = metItemsData.map(
          (item: MetGalleryProps) => ({
            id: item.objectID,
            image_url: item.primaryImageSmall || "",
            title: item.title || "Untitled",
            category: item.classification || null,
            culture: item.culture || null,
            period: item.period || null,
            material: item.medium || null,
          })
        );

        setPosts([...supabaseGallery, ...metGallery]);
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
