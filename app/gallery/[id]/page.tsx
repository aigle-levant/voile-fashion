import ProductDetails from "@/components/product/ProductDetails";
import RelatedProducts from "@/components/product/RelatedProducts";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item = null;

  if (/^\d+$/.test(id)) {
    // parse met api for items
    const numericId = parseInt(id.replace("met-", ""), 10);
    try {
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${numericId}`,
        { headers: { Accept: "application/json" } }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("MET API error for id", id, ":", res.status, errorText);
        return (
          <p className="text-red-500">
            Failed to fetch Met item. Status: {res.status}
          </p>
        );
      }

      const metData = await res.json();
      console.log("MET API response for id", id, ":", metData);
      item = {
        id: `met-${metData.objectID}`,
        image_url: metData.primaryImage || metData.primaryImageSmall,
        title: metData.title,
        category: metData.classification,
        culture: metData.culture || metData.country,
        period: metData.objectDate,
        material: metData.medium,
        description: metData.creditLine,
      };

      if (!metData.primaryImage && !metData.primaryImageSmall) return null;
    } catch (err) {
      console.error("Error fetching Met API item for id", id, ":", err);
      return <p className="text-red-500">Error loading product</p>;
    }
  } else {
    // seed data
    const supabase = await createClient();
    const { data: dbItem, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return (
        <p className="text-red-500">Failed to load product: {error.message}</p>
      );
    }

    item = dbItem;
  }

  if (!item) {
    return <p className="text-red-500">Product not found.</p>;
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
      <div id="related-products-wrapper" className="flex flex-col">
        <h2 className="text-2xl">We think you might like...</h2>
        {/* related products */}
        <RelatedProducts />
      </div>
    </div>
  );
}
