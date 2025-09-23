import { fetchSeedData } from "@/lib/supabase/fetchSeed";
import { fetchMetObjects } from "@/lib/met/fetchMetObjects";
import { type GalleryCardProps, type ProductProps } from "@/types/components";

export default async function Collection() {
  return (
    <div id="collection-content-wrapper">{/* add collected images */}</div>
  );
}
