import ProductTags from "./ProductTags";
import ProductDetailsSheet from "./ProductDetailsSheet";
import { type ProductProps } from "@/types/components";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { addToCollection } from "@/lib/actions/collections";

export default function ProductDetails({ product }: { product: ProductProps }) {
  return (
    <div id="products-details-wrapper" className="px-10 md:px-0 lg:px-0">
      <div className="flex flex-col">
        <h1 className="font-medium text-3xl py-6">{product.title}</h1>
        <ProductTags product={product} />
      </div>
      <div
        id="products-btn-wrapper"
        className="flex flex-row lg:flex-row gap-5 mt-20"
      >
        <div id="product-more-details-wrapper">
          <ProductDetailsSheet product={product} />
        </div>
        <form action={addToCollection}>
          <input type="hidden" name="itemId" value={product.id} />
          <Button variant="default" className="flex flex-row gap-5">
            <Plus />
            <p>Add to collection</p>
          </Button>
        </form>
      </div>
    </div>
  );
}
