// "use client";

// import { useEffect, useState } from "react";
// import GalleryCard from "../gallery/GalleryCard";
// import { GalleryCardProps } from "@/types/components";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { type MetGalleryProps } from "@/types/components";

// interface RelatedProductsProps {
//   tags: string[];
// }

// export default function RelatedProducts({ tags }: RelatedProductsProps) {
//   const [relatedItems, setRelatedItems] = useState<GalleryCardProps[]>([]);
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     async function fetchRelatedItems() {
//       const metAPIItems: GalleryCardProps[] = [];

//       for (const tag of tags) {
//         try {
//           const searchRes = await fetch(
//             `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${tag}`
//           );
//           const searchData = await searchRes.json();

//           if (searchData.objectIDs?.length) {
//             const topIDs = searchData.objectIDs.slice(0, 3);

//             for (const id of topIDs) {
//               const objRes = await fetch(
//                 `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
//               );
//               const objData = await objRes.json();

//               if (objData.primaryImageSmall) {
//                 metAPIItems.push({
//                   id: objData.objectID.toString(),
//                   title: objData.title || "Untitled",
//                   image_url: objData.primaryImageSmall,
//                   category: objData.classification || "",
//                   culture: objData.culture || "",
//                   period: objData.period || "",
//                   material: objData.medium || "",
//                 });
//               }
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching Met API data:", error);
//         }
//       }
//       const { data: seedData, error } = await supabase
//         .from("gallery")
//         .select("*")
//         .ilike("category", `%${tags.join("%")}%`)
//         .limit(20);

//       if (error) console.error("Supabase fetch error:", error);

//       const formattedSeedData: GalleryCardProps[] =
//         seedData?.map((item: MetGalleryProps) => ({
//           id: item.id,
//           title: item.title,
//           image_url: item.image_url,
//           category: item.category || "",
//           culture: item.culture || "",
//           period: item.period || "",
//           material: item.material || "",
//         })) || [];

//       // 3️⃣ Merge Met API items + Supabase items
//       setRelatedItems([...formattedSeedData, ...metAPIItems]);
//     }

//     fetchRelatedItems();
//   }, [tags, supabase]);

//   if (!relatedItems.length) return null;

//   return (
//     <div id="related-products-wrapper" className="my-6">
//       <h2 className="text-2xl font-bold mb-4">Related Items</h2>
//       <div
//         id="scroll-wrapper"
//         className="flex flex-row overflow-x-auto gap-4 pb-4"
//       >
//         {relatedItems.map((item) => (
//           <div key={item.id} className="flex-shrink-0 w-64 h-96">
//             <GalleryCard {...item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
