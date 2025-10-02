"use client";

import DeletionAlert from "./DeletionAlert";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CollectionHeader() {
  const supabase = createClient();
  const router = useRouter();
  const [alert, setAlert] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const deleteCollection = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/auth/login");
        return;
      }

      // Fetch all collection IDs for this user
      const { data: collections, error: colError } = await supabase
        .from("collections")
        .select("id")
        .eq("user_id", user.id);

      if (colError) throw colError;

      const collectionIds = collections?.map((c) => c.id) || [];
      if (!collectionIds.length) {
        setAlert({ message: "No collections to delete", type: "error" });
        return;
      }

      // Fetch all collection_items belonging to these collections
      const { data: items, error: itemsError } = await supabase
        .from("collection_items")
        .select("id")
        .in("collection_id", collectionIds);

      if (itemsError) throw itemsError;

      const itemIds = items?.map((i) => i.id) || [];
      if (!itemIds.length) {
        setAlert({ message: "No collection items to delete", type: "error" });
        return;
      }

      // Delete all collection items
      const { error: deleteError } = await supabase
        .from("collection_items")
        .delete()
        .in("id", itemIds);

      if (deleteError) throw deleteError;

      setAlert({
        message: "Collections deleted successfully!",
        type: "success",
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      setAlert({ message: "Failed to delete collections", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-3xl font-semibold mb-8">My Collection</h1>
      {alert && (
        <div
          className={`p-4 mb-4 rounded ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      <DeletionAlert onConfirm={deleteCollection} disabled={loading} />
    </div>
  );
}
