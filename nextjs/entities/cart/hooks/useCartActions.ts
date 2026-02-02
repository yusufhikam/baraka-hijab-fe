"use client";

import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  useAddToCartMutation,
  useDeleteCartMutation,
  useSyncCartMutation,
  useUpdateCartMutation,
} from "./useCartQuery";
import { useCallback, useMemo } from "react";
import { GuestCartPayloadType } from "../types/cart.type";
import {
  addCartToGuestCart,
  deleteItemFromGuestCart,
  removeGuestCart,
  updateCartInGuestCart,
} from "@/features/_cart/redux/slice/cartSlice";
import { usePathname } from "next/navigation";

export default function useCartActions() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { carts: guestCart } = useAppSelector((state) => state.cart);

  const homePage = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  // Tanstack mutation hooks
  const addMutation = useAddToCartMutation();
  const syncMutation = useSyncCartMutation();
  const deleteMutation = useDeleteCartMutation();
  const updateMutation = useUpdateCartMutation();

  // todo : function for add to cart
  const handleAddToCart = useCallback(
    (payload: GuestCartPayloadType) => {
      // if user is authenticated, add to cart to server
      if (isAuthenticated && user) {
        return addMutation.mutate({
          product_variant_option_id: payload.variant_option.id,
          quantity: payload.quantity,
        });
      }

      // if user is not authenticated, add to cart to local storage by redux
      dispatch(addCartToGuestCart(payload));
    },

    [isAuthenticated, user, addMutation, dispatch],
  );

  // todo : function for handle delete cart by product variant option id
  const handleDeleteCart = useCallback(
    (product_variant_option_id: number) => {
      // if user is authenticated, delete cart from server
      if (isAuthenticated) {
        return deleteMutation.mutate(product_variant_option_id);
      }

      // if user is not authenticated, delete cart from local storage by redux
      dispatch(
        deleteItemFromGuestCart({
          variant_option_id: product_variant_option_id,
        }),
      );
    },
    [isAuthenticated, deleteMutation, dispatch],
  );

  // todo : function for update cart by product variant option id to server
  const handleUpdateCart = useCallback(
    (payload: GuestCartPayloadType) => {
      if (payload.quantity < 1) return Promise.resolve();

      if (isAuthenticated) {
        return updateMutation.mutateAsync({
          product_variant_option_id: payload.variant_option.id,
          quantity: payload.quantity,
        });
      } else {
        dispatch(updateCartInGuestCart(payload));

        return Promise.resolve();
      }
    },
    [isAuthenticated, updateMutation, dispatch],
  );

  // ? guest payload for sync cart from local storage to server
  const guestPayload = useMemo(() => {
    return guestCart.map((item) => ({
      product_variant_option_id: item.variant_option.id,
      quantity: item.quantity,
    }));
  }, [guestCart]);

  // todo : function for sync cart from local storage to server
  const syncGuestCart = useCallback(() => {
    if ((!isAuthenticated && !homePage) || guestCart.length === 0) return;

    syncMutation.mutate({ carts: guestPayload });
    dispatch(removeGuestCart());
  }, [
    isAuthenticated,
    guestCart,
    guestPayload,
    syncMutation,
    dispatch,
    homePage,
  ]);

  return {
    handleAddToCart,
    handleUpdateCart,
    handleDeleteCart,
    syncGuestCart,
    isSyncingLoading: syncMutation.isPending,
    isAddingLoading: addMutation.isPending,
    isUpdatingLoading: updateMutation.isPending,
    isDeletingLoading: deleteMutation.isPending,
  };
}
