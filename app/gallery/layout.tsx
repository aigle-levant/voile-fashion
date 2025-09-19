import Sort from "@/components/gallery/Sort";
import FilterGallery from "@/components/gallery/Filter";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      id="gallery-wrapper"
      className="flex flex-col bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950"
    >
      <div id="gallery-actions-wrapper">
        <h1 className="text-3xl text-left">Browse our collection</h1>
        <div id="gallery-actions">
          <Sort />
          <FilterGallery />
        </div>
      </div>
      <main id="main" className="flex-1">
        {children}
      </main>
    </section>
  );
}
