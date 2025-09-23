import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PrivateSidebar } from "@/components/common/PrivateNavbar";
import Navbar from "@/components/common/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-around">
      <Navbar />
      <SidebarProvider>
        <PrivateSidebar />
        <div className="flex flex-1 flex-col bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 text-zinc-50">
          <header className="p-4 ml-[9rem]">
            <SidebarTrigger />
          </header>
          <main className="ml-[9rem] pt-10 flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
