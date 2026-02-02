"use client";

import useUserCart from "@/entities/cart/hooks/useUserCart";

import { useAuth } from "@/features/auth/hooks/useAuth";

import CartPopover from "./variants/CartPopover";
import CartDrawer from "./variants/CartDrawer";

type ModalCartProps = {
  variant?: "popover" | "drawer";
};

export default function ModalCart({ variant = "drawer" }: ModalCartProps) {
  const { carts, totalItems, isLoadingCart } = useUserCart();
  const { isAuthenticated } = useAuth();

  const isLoadCarts = isAuthenticated && isLoadingCart;

  if (variant === "popover") {
    return (
      <CartPopover
        carts={carts}
        isLoadCarts={isLoadCarts}
        totalItems={totalItems}
      />
    );
  }

  return (
    <CartDrawer
      carts={carts}
      isLoadCarts={isLoadCarts}
      totalItems={totalItems}
    />
  );
}
