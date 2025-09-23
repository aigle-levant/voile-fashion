import { type GalleryCardProps } from "@/types/components";
import Image from "next/image";
import Link from "next/link";
// for tags
import { Badge } from "@/components/ui/badge";

export default function GalleryCard({
  image_url,
  id,
  title,
  category,
  culture,
  period,
  material,
}: GalleryCardProps) {
  // get props as tags
  // if its like eg: silk, cotton, then it splits them into different tags
  const tags = [category, culture, period, material]
    .filter(Boolean)
    .flatMap((field) => field!.split(",").map((t) => t.trim()));
  return (
    <Link href={`/gallery/${id}`} passHref>
      <div
        id="gallery-card-wrapper"
        className="relative bg-zinc-800 shadow-md text-zinc-50 dark:bg-zinc-200 dark:text-zinc-950 w-full h-96 overflow-hidden "
      >
        <Image
          fill
          src={image_url}
          alt={title}
          className="object-cover transition-all duration-300 hover:brightness-110"
        />

        <div
          id="gallery-card-overlay-wrapper"
          className="absolute inset-0 bg-zinc-950/50 hover:bg-zinc-950/20 transition-colors duration-300 px-3 py-5 flex flex-col justify-end items-start"
        >
          <p className="font-bold text-xl text-left md-5 sm:text-base md:text-xl lg:text-2xl">
            {title}
          </p>
          <hr className="py-3 z-100 border-zinc-50 dark:border-zinc-950" />
          <div id="tags-wrapper" className="flex flex-row flex-wrap gap-2">
            {/* a way to add tags */}
            {tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="font-medium bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
