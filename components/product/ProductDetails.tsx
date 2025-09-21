import ProductTags from "./ProductTags";
import ProductDetailsSheet from "./ProductDetailsSheet";
import { type ProductProps } from "@/types/components";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function ProductDetails({ product }: { product: ProductProps }) {
  return (
    <div id="products-details-wrapper" className="flex flex-col">
      <h1 className="font-besley font-medium text-3xl">{product.title}</h1>
      <ProductTags product={product} />
      <div id="product-more-details-wrapper">
        <ProductDetailsSheet product={product} />
      </div>
      <div id="products-btn-wrapper">
        <Button variant="default" className="flex flex-row gap-5">
          <Plus />
          <p>Add to collection</p>
        </Button>
      </div>
    </div>
  );
}
