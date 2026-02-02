import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cartApi";
import { CartPayloadType, SyncCartType } from "../types/cart.type";
import { toast } from "sonner";
import { useAppSelector } from "@/stores/store";

const CART_QUERY_KEY = ["carts"];

/**
 *
 * * THIS FILE IS USED FOR HANDLING CART REACT QUERY & MUTATION HOOKS
 *
 **/

// get carts
export const useCartQuery = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: cartApi.getCarts,
    staleTime: 15000, // 15 seconds
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });
};

// mutation for add to cart
export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CartPayloadType) => cartApi.addToCart(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });

      toast.success("Product added to cart.", {
        duration: 1000,
        position: "top-right",
      });
    },
    onError: (err) => {
      const error = err.message;
      toast.error("Failed to add product to cart.", {
        description: error,
        duration: 1000,
        position: "top-right",
      });
    },
  });
};

// mutation for sync cart from local storage
export const useSyncCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SyncCartType) =>
      cartApi.syncFromLocalStorage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });

      toast.success("New product added to your cart.", {
        duration: 1000,
        position: "top-right",
      });
    },
    onError: (err) => {
      const error = err.message;
      toast.error("Failed to syncronize cart.", {
        description: error,
        duration: 1000,
        position: "top-right",
      });
    },
  });
};

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CartPayloadType) => {
      return cartApi.updateCart(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });

      // toast.success("Cart updated.", {
      //   duration: 1000,
      //   position: "top-right",
      // });
    },

    onError: (err) => {
      const error = err.message;
      toast.error("Failed to update cart.", {
        description: error,
        duration: 1000,
        position: "top-right",
      });
    },
  });
};

// mutation for delete cart from server
export const useDeleteCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product_variant_option_id: number) =>
      cartApi.deleteCart(product_variant_option_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });

      toast.success("Product deleted from cart.", {
        duration: 1000,
        position: "top-right",
      });
    },
    onError: (err) => {
      const error = err.message;
      toast.error("Failed to delete product from cart.", {
        description: error,
        duration: 1000,
        position: "top-right",
      });
    },
  });
};
