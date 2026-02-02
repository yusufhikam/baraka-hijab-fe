"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import useHideNavbar from "@/hooks/useHideNavbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProfileButton from "../../Navbar/ProfileButton";
import { usePathname } from "next/navigation";
import { profileLinks } from "../../Navbar/utils/navUtils";

export default function AppSidebar() {
  const { navbarHidden } = useHideNavbar();
  const { user } = useAuth();
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className={cn(
        "z-2 h-[80dvh] transition-all duration-300",
        navbarHidden ? "translate-y-0" : "translate-y-14",
      )}
    >
      <SidebarContent className="flex-col justify-between overflow-hidden rounded-lg py-2 shadow-lg shadow-black/40">
        <section className="space-y-5">
          <SidebarHeader
            className={cn(
              "w-full items-center",
              // open ? "translate-y-0 opacity-100" : "-translate-y-1/2 opacity-0",
            )}
          >
            <div className="item-start inline-flex w-full justify-between">
              {open && (
                <h2>
                  Hello, <b>{user?.name}</b>
                </h2>
              )}

              <SidebarTrigger
                size={"lg"}
                className="hover:bg-baraka-lightgreen-200 hover:text-white"
              />
            </div>

            <hr className="h-px w-3/4 bg-black/40" />
          </SidebarHeader>
          <SidebarMenu
            className={cn("px-2 group-data-[collapsible=icon]:items-center")}
          >
            {profileLinks.map((menu, idx) => (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton
                  tooltip={menu.title}
                  asChild
                  isActive={pathname === menu.href}
                  className={cn(
                    "data-[active=true]:bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 data-[active=true]:hover:bg-baraka-lightgreen-200 hover:text-white data-[active=true]:text-white",
                  )}
                >
                  <Link href={menu.href}>
                    <menu.icon />
                    {menu.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </section>
        <SidebarFooter className="items-center px-2">
          <ProfileButton
            side="right"
            sideOffset={20}
            displayEmail
            className="shadow-lg shadow-black/50"
            popoverClassName="hover:bg-baraka-lightgreen-200 overflow-hidden px-2 py-1 hover:text-white rounded-lg"
          />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
