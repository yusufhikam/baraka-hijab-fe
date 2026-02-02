import { useAppSelector } from "@/stores/store";
import { useCartQuery } from "./useCartQuery";
import { useMemo } from "react";

/**
 *
 * * THIS HOOK IS USED FOR HANDLING CART DATA BY USER AUTHENTICATION
 *
 *
 * @returns{
 *  * totalItems: number;
 *  * isLoadingCart: boolean;
 *  * carts: CartTypeResponse[];
 *  * serverCarts: CartTypeResponse[];
 *  * guestCarts: GuestCartPayloadType[];
 * }
 */

export default function useUserCart() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { carts: guestCarts } = useAppSelector((state) => state.cart);
  const { data: serverCarts, isLoading: isLoadingCart } = useCartQuery();

  // todo: handle cart data by user authentication
  const carts = useMemo(() => {
    // if user is not authenticated, return guest carts data from local storage
    if (!isAuthenticated) return guestCarts;

    // if user is authenticated, return server carts data
    return serverCarts?.data ?? [];
  }, [isAuthenticated, serverCarts, guestCarts]);

  // todo: handle total items in cart
  const totalItems = useMemo(() => {
    // if user is not authenticated, return guest carts data length from local storage
    if (!isAuthenticated) return guestCarts.length;

    // if user is authenticated, return server carts data length
    return serverCarts?.data.length;
  }, [isAuthenticated, serverCarts, guestCarts]);

  return {
    totalItems,
    isLoadingCart,
    carts,
    serverCarts,
    guestCarts,
  };
}
