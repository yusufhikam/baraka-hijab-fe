import { CartPayloadType } from "@/entities/cart/types/cart.type";

export type CheckoutPreparePayloadType = {
  source: "cart" | "buy_now";
  items: CartPayloadType[];
};
