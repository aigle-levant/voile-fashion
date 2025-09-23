import Navbar from "@/components/common/Navbar";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      id="product-wrapper"
      className="bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
    >
      {/* navbar */}
      <Navbar />
      <main id="main" className="flex-1 pt-20">
        {children}
      </main>
    </section>
  );
}
