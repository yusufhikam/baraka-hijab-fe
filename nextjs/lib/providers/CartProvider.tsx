"use client";

import useCart from "@/entities/cart/hooks/useCart";
import { useAppSelector } from "@/stores/store";
import { useEffect, useRef } from "react";

export default function CartSyncHandler() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { syncGuestCart } = useCart();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (isAuthenticated) {
      syncGuestCart();
      hasSynced.current = true;
    }
  }, [isAuthenticated, syncGuestCart]);

  return null;
}
