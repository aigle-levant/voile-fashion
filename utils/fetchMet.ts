import {
  type GalleryCardProps,
  type MetGalleryProps,
} from "@/types/components";

export async function fetchMet(): Promise<GalleryCardProps[]> {
  try {
    const searchRes = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?q=dress&hasImages=true"
    );
    const searchJson = await searchRes.json();
    const objectIDs: number[] = searchJson.objectIDs?.slice(0, 15) || [];

    const objects = await Promise.all(
      objectIDs.map(async (id: number) => {
        const res = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        const obj: MetGalleryProps = await res.json();
        return {
          id: `met-${obj.objectID}`,
          title: obj.title,
          image_url: obj.primaryImageSmall,
          category: obj.classification ?? "",
          culture: obj.culture ?? "",
          period: obj.period ?? "",
          material: obj.medium ?? "",
        } as GalleryCardProps;
      })
    );

    return objects.filter((obj) => obj.image_url);
  } catch (err) {
    console.error("Met API error:", err);
    return [];
  }
}
