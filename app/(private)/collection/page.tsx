import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CollectionGrid from "@/components/private/collections/CollectionGrid";
import { type Collection } from "@/types/components";
import CollectionHeader from "@/components/private/collections/CollectionHeader";

interface RawCollectionItem {
  id: string;
  added_at: string;
  gallery: {
    met_object_id?: string;
    title: string;
    image_url?: string;
    category: string | null;
    culture: string | null;
    period: string | null;
    material: string | null;
    description?: string | null;
  } | null;
  collections: {
    id: string;
    title: string;
    created_at: string;
    user_id: string;
  } | null;
}

export default async function CollectionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: rawCollectionItems, error } = (await supabase
    .from("collection_items")
    .select(
      `
      id,
      added_at,
      gallery:gallery_id (
        met_object_id,
        title,
        image_url,
        category,
        culture,
        period,
        material,
        description
      ),
      collections!inner (
        id,
        title,
        created_at,
        user_id
      )
    `
    )
    .eq("collections.user_id", user.id)
    .order("added_at", { ascending: false })) as {
    data: RawCollectionItem[] | null;
    error: unknown;
  };
  console.log(rawCollectionItems);
  if (error) {
    console.error("Error fetching collections:", error);
    return <p className="p-6 text-red-500">Failed to load collections.</p>;
  }

  const collections: Collection[] = (rawCollectionItems ?? [])
    .map((item: RawCollectionItem) => {
      const galleryItem = item.gallery;
      const collectionMeta = item.collections;

      if (!galleryItem || !collectionMeta) return null;

      return {
        id: item.id,
        created_at: collectionMeta.created_at,
        gallery: galleryItem,
      };
    })
    .filter(Boolean) as Collection[];
  console.log(collections.length);
  console.log("Collection inserted successfully");
  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      <CollectionHeader />
      <CollectionGrid collections={collections} />
    </div>
  );
}
