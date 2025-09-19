import Navbar from "@/components/common/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950">
      {/* so that entire screen can darken when i click searchbar */}
      <Navbar />
      <main className="flex-1 flex flex-col items-center">{children}</main>
    </div>
  );
}
