import Image from "next/image";
import { type GalleryCardProps } from "@/types/components";

export default function MasonryCard({ data }: { data: GalleryCardProps }) {
  return (
    <div className="relative group rounded-xl overflow-hidden shadow-md">
      {/* Featured image */}
      <Image
        src={data.image_url}
        alt={data.title}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
