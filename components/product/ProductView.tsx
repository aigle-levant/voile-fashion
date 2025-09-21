// main component for product view
import ProductDetails from "./ProductDetails";
// import RelatedProducts from "./RelatedProducts";
// fetching data
import { createClient } from "@/lib/supabase/server";
// real smooth images
import Image from "next/image";

export default async function ProductView({
  params,
}: {
  params: { id: string };
}) {
  // fetch details from supabase
  const supabase = await createClient();
  const { data: item, error } = await supabase
    .from("gallery")
    .select(
      "id, image_url, description, title, category, culture, period, material"
    )
    .eq("id", params.id)
    .single();
  if (error || !item) {
    return (
      <p className="text-red-500">Failed to load product: {error?.message}</p>
    );
  }
  return (
    <div id="product-view-wrapper" className="flex flex-col">
      <div id="product-main-details-wrapper" className="flex flex-row">
        <div id="product-image">
          <Image
            src={item.image_url}
            alt={item.title}
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
        <ProductDetails product={item} />
      </div>
      <div id="product-addtl-details-wrapper">
        {/* <RelatedProducts currentProductId={item.id} /> */}
      </div>
    </div>
  );
}
