import { cartApi } from "@/entities/cart/api/cartApi";
import { GuestCartPayloadType } from "@/entities/cart/types/cart.type";
import { createSlice } from "@reduxjs/toolkit";

type GuestCartType = {
  carts: GuestCartPayloadType[];
};

const initialState: GuestCartType = {
  carts:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carts") || "[]")
      : [],
};

const CART_KEY = "carts";

const guestCartSlice = createSlice({
  name: "guestCart",
  initialState,
  reducers: {
    // add to cart
    addCartToGuestCart: (state, action: { payload: GuestCartPayloadType }) => {
      const updatedCarts = cartApi.addCartToLocalStorage(action.payload);

      state.carts = updatedCarts;
    },

    // update cart quantity
    updateCartInGuestCart: (
      state,
      action: { payload: GuestCartPayloadType },
    ) => {
      const updatedCarts = cartApi.updateCartInLocalStorage(action.payload);

      state.carts = updatedCarts;
    },

    // delete single item
    deleteItemFromGuestCart: (
      state,
      action: { payload: { variant_option_id: number } },
    ) => {
      const updatedCarts = cartApi.deleteFromLocalStorage(
        action.payload.variant_option_id,
      );

      state.carts = updatedCarts;
    },
    removeGuestCart: (state) => {
      state.carts = [];
      localStorage.removeItem(CART_KEY);
    },
  },
});

export const {
  addCartToGuestCart,
  removeGuestCart,
  deleteItemFromGuestCart,
  updateCartInGuestCart,
} = guestCartSlice.actions;
export default guestCartSlice.reducer;
