"use client";

import Image from "next/image";
import Link from "next/link";
import { type Collection } from "@/types/components";

export default function CollectionGrid({
  collections,
}: {
  collections: Collection[];
}) {
  if (!collections.length) {
    return (
      <p className="text-gray-500 text-lg text-center">
        You haven’t added anything to your collections yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {collections.map((c) => (
        <Link
          key={c.id}
          href={`/gallery/${c.gallery.met_object_id}`}
          className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition bg-white"
        >
          {c.gallery.image_url ? (
            <Image
              src={c.gallery.image_url}
              alt={c.gallery.title}
              width={400}
              height={400}
              className="w-full h-60 object-cover"
            />
          ) : (
            <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
