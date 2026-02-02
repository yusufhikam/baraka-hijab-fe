"use client";

import { Button } from "@/components/ui/button";
import ModalCart from "@/features/_cart/_components/ModalCart";
import usePauseLenis from "@/hooks/usePauseLenis";
import { Menu } from "lucide-react";
import { navLinks } from "../utils/navUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import ProfileButton from "../ProfileButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AuthButtons from "../AuthButtons";

const NavMenu = () => {
  const { openModal, setOpenModal } = usePauseLenis();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  return (
    <section
      className={cn(
        "inline-flex items-center justify-between gap-5 transition-transform duration-300 ease-in-out lg:hidden",
        openModal ? "translate-x-2/3" : "translate-x-0",
      )}
    >
      <ModalCart />

      <Drawer
        direction="left"
        fixed
        open={openModal}
        onOpenChange={setOpenModal}
      >
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>
        <DrawerTrigger asChild>
          <Button
            disabled={openModal}
            variant={"ghost"}
            // size={"icon-lg"}
            className={cn(
              "hover:text-baraka-primary-300",
              openModal && "pointer-events-none opacity-0",
            )}
          >
            <Menu className="size-6" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="flex h-dvh w-full flex-col justify-between overflow-hidden p-5">
          <section className="mt-10 flex flex-col gap-4">
            {navLinks.map((nav, idx) => (
              <Link
                key={idx}
                href={nav.href}
                className={cn(
                  "font-geist hover:text-baraka-primary-300 text-4xl",
                  pathname === nav.href && "text-baraka-primary-300",
                )}
              >
                {nav.title}
              </Link>
            ))}
          </section>

          <div className="border-t border-t-black pt-5">
            {isAuthenticated ? (
              <ProfileButton displayName />
            ) : (
              <section className="inline-flex w-full flex-col items-start justify-evenly gap-5 overflow-hidden">
                <AuthButtons className="w-full" />
              </section>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default NavMenu;
