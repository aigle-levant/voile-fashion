import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PrivateSidebar } from "@/components/common/PrivateNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PrivateSidebar />
      <main className="ml-[9rem] bg-zinc-950 text-zinc-50 p-6 flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
