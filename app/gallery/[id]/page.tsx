import ProductDetails from "@/components/product/ProductDetails";
// import RelatedProducts from "@/components/product/RelatedProducts";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <p className="text-red-500">Failed to load product: {error.message}</p>
    );
  }

  if (!item || !item.image_url) {
    return <p className="text-red-500">Product not found or missing image.</p>;
  }

  return (
    <div id="product-page-wrapper" className="flex flex-col pt-10">
      <div
        id="product-main-details-wrapper"
        className="flex md:flex-row lg:flex-row flex-col justify-center md:gap-40 lg:gap-40 gap-10"
      >
        {/* product image */}
        <div id="product-image">
          <Image
            src={item.image_url}
            alt={item.title}
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
        {/* product details */}
        <ProductDetails product={item} />
      </div>
      {/* <div id="related-products-wrapper" className="flex flex-col">
        <h2 className="text-2xl">We think you might like...</h2> */}
      {/* related products */}
      {/* <RelatedProducts /> */}
      {/* </div> */}
    </div>
  );
}
