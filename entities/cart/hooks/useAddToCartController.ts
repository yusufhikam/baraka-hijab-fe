import { ProductType } from "@/entities/product/types/product.type";
import { useCallback } from "react";
import { GuestCartPayloadType } from "@/entities/cart/types/cart.type";
import useCartActions from "./useCartActions";
import { toast } from "sonner";
import useProductPurchaseState from "@/hooks/useProductPurchaseState";

export default function useAddToCartController(
  product: ProductType,
  purchase: ReturnType<typeof useProductPurchaseState>,
) {
  //
  const { handleAddToCart: handleAddToCartMutation, isAddingLoading } =
    useCartActions();

  // submit form for add to cart
  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!purchase.option || !purchase.variant) {
        toast.info("Please Select Variant Size", {
          duration: 3000,
          position: "top-right",
          // richColors: true,
        });

        return;
      }

      // ? server payload only [product_variant_option_id, quantity]
      // this is payload for store data in to local storage by guest user for mapping
      const payload: GuestCartPayloadType = {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          slug: product.slug,
          thumbnail: product.thumbnail,
        },
        product_variant: {
          id: purchase.variant.id,
          name: purchase.variant.name,
          color: purchase.variant.color,
          weight: purchase.variant.weight,
        },
        variant_option: purchase.option!,
        quantity: purchase.quantity,
      };

      // react query mutation + handle to localstorage by isAuthenticated state
      handleAddToCartMutation(payload);

      // reset state & close modal
      purchase.setOpenModal(false);
      purchase.resetState();
    },
    [handleAddToCartMutation, product, purchase],
  );

  return {
    isAddingLoading,

    submit,
  };
}
