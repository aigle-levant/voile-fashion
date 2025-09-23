import { NextResponse } from "next/server";
import { type MetGalleryProps } from "@/types/components";

export async function GET() {
  try {
    // Fetch search results from Met Museum API
    const searchRes = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=french",
      { headers: { Accept: "application/json" } }
    );

    if (!searchRes.ok) {
      const text = await searchRes.text();
      console.error(
        `Search API error: ${searchRes.status} ${searchRes.statusText}`
      );
      console.error("Raw response:", text.slice(0, 200));
      return NextResponse.json(
        { error: `Failed to fetch search results: ${searchRes.statusText}` },
        { status: searchRes.status }
      );
    }

    const contentType = searchRes.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await searchRes.text();
      console.error("Non-JSON response received:", text.slice(0, 200));
      return NextResponse.json(
        { error: "Invalid response format from Met API" },
        { status: 500 }
      );
    }

    const searchData = await searchRes.json();
    const objectIDs: number[] = searchData.objectIDs?.slice(0, 10) || [];

    if (objectIDs.length === 0) {
      console.warn("No objects found for query");
      return NextResponse.json(
        { error: "No objects found for the given query" },
        { status: 404 }
      );
    }

    // Fetch individual object details
    const metItemsDataWithNulls: (MetGalleryProps | null)[] = await Promise.all(
      objectIDs.map(async (id) => {
        const res = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
          { headers: { Accept: "application/json" } }
        );
        if (!res.ok) {
          console.error(
            `Object API error for ID ${id}: ${res.status} ${res.statusText}`
          );
          return null;
        }
        if (!res.headers.get("content-type")?.includes("application/json")) {
          console.error(`Non-JSON response for object ID ${id}`);
          return null;
        }
        return (await res.json()) as MetGalleryProps;
      })
    );

    const metItemsData: MetGalleryProps[] = metItemsDataWithNulls.filter(
      (item): item is MetGalleryProps => item !== null
    );

    if (metItemsData.length === 0) {
      console.warn("No valid object data retrieved");
      return NextResponse.json(
        { error: "No valid object data retrieved" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: metItemsData });
  } catch (err) {
    console.error("Error fetching Met API:", err);
    return NextResponse.json(
      { error: "Failed to fetch Met API" },
      { status: 500 }
    );
  }
}
