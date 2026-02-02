import ApiClient from "@/lib/axios/apiClient";
import {
  CartPayloadType,
  CartTypeResponse,
  GuestCartPayloadType,
  SyncCartType,
} from "../types/cart.type";
import { baseApiURL } from "@/lib/utils";
import { ApiResponse } from "@/types/apiResponse.type";
import { AxiosResponse } from "axios";

export const cartApi = {
  // todo : add cart to local storage
  addCartToLocalStorage: (cartItem: GuestCartPayloadType) => {
    const carts = JSON.parse(localStorage.getItem("carts") || "[]");

    const existingIndex = carts.findIndex(
      (item: GuestCartPayloadType) =>
        item.variant_option.id === cartItem.variant_option.id,
    );

    if (existingIndex >= 0) {
      carts[existingIndex].quantity += cartItem.quantity;
    } else {
      carts.push(cartItem);
    }

    localStorage.setItem("carts", JSON.stringify(carts));

    return carts;
  },
  // todo : update cart in local storage
  updateCartInLocalStorage: (cartItem: GuestCartPayloadType) => {
    const carts = JSON.parse(localStorage.getItem("carts") || "[]");

    const existingIndex = carts.findIndex(
      (item: GuestCartPayloadType) =>
        item.variant_option.id === cartItem.variant_option.id,
    );

    if (existingIndex >= 0) {
      carts[existingIndex].quantity = cartItem.quantity;
    }

    localStorage.setItem("carts", JSON.stringify(carts));

    return carts;
  },

  deleteFromLocalStorage: (product_variant_option_id: number) => {
    const carts: GuestCartPayloadType[] = JSON.parse(
      localStorage.getItem("carts") || "[]",
    );

    const cartItemIndex = carts.findIndex(
      (item) => item.variant_option.id === product_variant_option_id,
    );

    if (cartItemIndex >= 0) {
      carts.splice(cartItemIndex, 1);
    }

    localStorage.setItem("carts", JSON.stringify(carts));

    return carts;
  },

  // todo :  sync cart from local storage to server
  syncFromLocalStorage: async (payload: SyncCartType) => {
    if (payload.carts.length === 0) return;

    try {
      const res = await ApiClient.post(`${baseApiURL}/carts/sync`, payload);

      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
      throw err;
    }
  },

  // todo : get carts from server
  getCarts: async () => {
    try {
      const res: AxiosResponse<ApiResponse<CartTypeResponse[]>> =
        await ApiClient.get(`${baseApiURL}/carts`);
      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
      throw err;
    }
  },

  // todo : add cart to server
  addToCart: async (payload: CartPayloadType) => {
    try {
      const res = await ApiClient.post(`${baseApiURL}/carts`, payload);

      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
      throw err;
    }
  },

  // todo : update cart from server

  updateCart: async (payload: CartPayloadType) => {
    try {
      const data = {
        quantity: payload.quantity,
        _method: "PATCH",
      };

      const res = await ApiClient.patch(
        `${baseApiURL}/carts/${payload.product_variant_option_id}`,
        data,
      );

      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
      throw err;
    }
  },

  // todo : delete cart from server
  deleteCart: async (product_variant_option_id: number) => {
    try {
      const res = await ApiClient.delete(
        `${baseApiURL}/carts/${product_variant_option_id}`,
      );

      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
    }
  },
};
