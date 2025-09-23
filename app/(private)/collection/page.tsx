import Collection from "@/components/private/Collection";
import ShareToSocials from "@/components/private/ShareToSocials";

export default function CollectionPage() {
  return (
    <section id="collection-wrapper">
      <div className="flex flex-col md:flex-row lg:flex-row">
        <h1 className="text-4xl">Collection</h1>
        {/* TODO: Wire up save collections popup with this */}
        <ShareToSocials />
      </div>
      <Collection />
    </section>
  );
}
