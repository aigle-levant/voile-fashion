"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import GalleryCard from "./GalleryCard";
import { type GalleryCardProps } from "@/types/components";

export default function GalleryView() {
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<GalleryCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  //   create supabase client
  const supabase = createClient();
  // fetch data from supabase table
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: items, error } = await supabase
          .from("gallery")
          .select("image_url, title, category, culture, period, material");
        if (error) {
          console.error(error.message);
          setError(error.message);
        } else {
          console.log(items);

          setPosts(items);
        }
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
  }, [supabase]);

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
            key={item.title}
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
