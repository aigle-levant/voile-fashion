"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCollection(formData: FormData) {
  const galleryId = formData.get("itemId") as string;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: collectionData, error: collectionError } = await supabase
    .from("collections")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (collectionError) {
    throw new Error(collectionError.message);
  }
  let collectionId = collectionData?.id;

  if (!collectionId) {
    const { data: newCollection, error: newCollError } = await supabase
      .from("collections")
      .insert({ user_id: user.id, title: "My Collection" })
      .select("id")
      .maybeSingle();

    if (newCollError || !newCollection) throw new Error(newCollError?.message);
    collectionId = newCollection.id;
  }

  const { error } = await supabase.from("collection_items").insert({
    collection_id: collectionId,
    gallery_id: galleryId,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/collections");
}
