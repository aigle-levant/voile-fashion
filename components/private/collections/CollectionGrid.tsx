"use client";

import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
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

  // breakpoints for responsive masonry
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
        <Link
          key={c.id}
          href={`/gallery/${c.gallery.met_object_id}`}
          className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition bg-white mb-6 block"
        >
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
      ))}
    </Masonry>
  );
}
