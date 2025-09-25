"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useGalleryFilters() {
  const [categories, setCategories] = useState<string[]>([]);
  const [cultures, setCultures] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const supabase = createClient();

        const { data, error: dbError } = await supabase
          .from("gallery")
          .select("category, culture, material");

        if (dbError) throw new Error(dbError.message);

        setCategories([...new Set(data?.map((i) => i.category ?? ""))]);
        setCultures([...new Set(data?.map((i) => i.culture ?? ""))]);
        setMaterials([...new Set(data?.map((i) => i.material ?? ""))]);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchFilters();
  }, []);

  return { categories, cultures, materials, loading, error };
}
