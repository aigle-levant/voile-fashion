import { createClient } from "@/lib/supabase/client";
import { type ProductProps } from "@/types/components";

export async function fetchSeedData(): Promise<ProductProps[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("gallery")
    .select(
      "id, title, image_url, category, culture, period, material, description"
    );

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }

  return data ?? [];
}
