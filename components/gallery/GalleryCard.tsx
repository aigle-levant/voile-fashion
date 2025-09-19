import { type GalleryCardProps } from "@/types/components";
import Image from "next/image";

export default function GalleryCard({
  url,
  title,
  category,
  culture,
  period,
  material,
}: GalleryCardProps) {
  // get props as tags
  const tags = [category, culture, period, material].filter(Boolean);
  return (
    <div
      id="gallery-card-wrapper"
      className="bg-zinc-800 shadow-md text-zinc-50 dark:bg-zinc-200 dark:text-zinc-950 py-3 px-2"
    >
      <div
        id="gallery-card-img-wrapper"
        className="w-full h-56 overflow-hidden"
      >
        <Image src={url} alt={title} className="w-full h-full object-cover" />
      </div>
      <div id="gallery-card-overlay-wrapper" className="z-100">
        <p className="font-bold text-xl text-left">{title}</p>
        <hr className="py-3" />
        <div id="tags-wrapper" className="flex flex-row flex-wrap gap-2">
          {/* a way to add tags */}
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-zinc-700 dark:bg-zinc-300 text-sm px-3 py-1 rounded-full text-zinc-100 dark:text-zinc-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
