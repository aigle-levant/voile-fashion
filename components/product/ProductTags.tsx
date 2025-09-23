import { type ProductProps } from "@/types/components";
import { Badge } from "../ui/badge";

export default function ProductTags({ product }: { product: ProductProps }) {
  // trim tags
  const tags = (field: string | null | undefined) =>
    field?.split(",").map((t) => t.trim()) || [];
  return (
    <div id="product-tags-wrapper" className="flex flex-col gap-6">
      <div id="period" className="flex flex-row gap-5">
        <p className="text-left">BELONGS TO ERA: </p>
        {tags(product.period).map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <div id="culture" className="flex flex-row gap-5">
        <p className="text-left">CULTURE: </p>
        {tags(product.culture).map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <div id="materials" className="flex flex-row gap-5">
        <p className="text-left">MATERIALS: </p>
        {tags(product.material).map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
