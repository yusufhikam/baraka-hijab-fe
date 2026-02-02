"use client";

import { useAppSelector } from "@/stores/store";
import ProfileButton from "./ProfileButton";
import ModalCart from "@/features/_cart/_components/ModalCart";
import AuthButtons from "./AuthButtons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ButtonsNav() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  return (
    <>
      <ModalCart />

      {!isAuthenticated ? (
        <AuthButtons />
      ) : (
        <ProfileButton
          popoverClassName={cn("", pathname.startsWith("/user") && "hidden")}
        />
      )}
    </>
  );
}
