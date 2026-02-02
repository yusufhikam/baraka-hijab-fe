import findProductVariantAndOptions from "../utils/findVariant";
import useUserCart from "./useUserCart";
import useCartActions from "./useCartActions";

/**
 * * THIS HOOK IS FOR HANDLE CART API
 *
 * ? please check the any hook with "useCart" + "Controller" for handle mutation logic
 *
 */

export default function useCart() {
  const userCart = useUserCart();
  const cartActions = useCartActions();
  return {
    ...userCart,
    ...cartActions,
    findProductVariantAndOptions,
  };
}
