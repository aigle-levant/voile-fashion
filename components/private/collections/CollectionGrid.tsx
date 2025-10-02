"use client";

import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import { type Collection } from "@/types/components";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function CollectionGrid({
  collections,
}: {
  collections: Collection[];
}) {
  const supabase = createClient();
  const router = useRouter();

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from("collection_items")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Failed to delete item:", error);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!collections.length) {
    return (
      <p className="text-gray-500 text-lg text-center">
        You haven’t added anything to your collections yet.
      </p>
    );
  }

  const breakpointColumnsObj = {
    default: 4,
    1280: 4,
    1024: 3,
    768: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto gap-6"
      columnClassName="bg-clip-padding"
    >
      {collections.map((c) => (
        <div
          key={c.id}
          className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition bg-white mb-6"
        >
          <button
            onClick={() => deleteItem(c.id)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center text-sm z-10 hover:bg-zinc-50 hover:text-black transition"
          >
            <X />
          </button>

          <Link href={`/gallery/${c.gallery.met_object_id}`}>
            {c.gallery.image_url ? (
              <Image
                src={c.gallery.image_url}
                alt={c.gallery.title}
                width={400}
                height={400}
                className="w-full object-cover"
              />
            ) : (
              <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </Link>
        </div>
      ))}
    </Masonry>
  );
}
