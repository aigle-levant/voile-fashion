"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import GalleryCard from "./GalleryCard";
import {
  type GalleryCardProps,
  type MetGalleryProps,
} from "@/types/components";

export default function GalleryView() {
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<GalleryCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  // fetch data from supabase table
  useEffect(() => {
    async function fetchData() {
      try {
        // fetch from supabase table
        const supabase = createClient();
        const { data: items, error: supabaseError } = await supabase
          .from("gallery")
          .select("image_url, title, category, culture, period, material, id");
        if (supabaseError) {
          setError(supabaseError.message);
        }
        // make supabase items array
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
        //  fetch from met museum api
        const metRes = await fetch("/api/met");
        const metJson = await metRes.json();
        const metItemsData: MetGalleryProps[] = metJson.data || [];
        // make met museum array
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
        // use this for every catch, else ts screams at ye
        // TODO: Make a common error function thingy, then call that instead
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
          setError(err.message);
        } else {
          console.error(err);
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  //   use react suspense for loading
  // remember that nextjs tutorial?
  if (isLoading) {
    return <p>Loading...</p>;
  }
  // handle errors
  if (error) return <p>Failed to load gallery: {error}</p>;
  //   normal
  return (
    <div
      id="gallery-wrapper"
      className="bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {posts.map((item) => (
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
