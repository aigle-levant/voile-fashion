import { type GalleryCardProps } from "@/types/components";

export default function GalleryCard({
  url,
  title,
  category,
  culture,
  period,
  material,
}: GalleryCardProps) {
  return (
    <div
      id="gallery-card-wrapper"
      className="bg-zinc-800 shadow-md text-zinc-50"
    >
      <div id="gallery-card-img-wrapper">
        <img src={url} alt={title} />
      </div>
    </div>
  );
}
