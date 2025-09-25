import { Settings, SmileIcon, BookCopyIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// menu items
const items = [
  {
    title: "View profile",
    url: "/profile",
    icon: SmileIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Collection",
    url: "/collection",
    icon: BookCopyIcon,
  },
];

export function PrivateSidebar() {
  return (
    <Sidebar className="text-zinc-50 dark:text-zinc-950 text-left">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Voile</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
