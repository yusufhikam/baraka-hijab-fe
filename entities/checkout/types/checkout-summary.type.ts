import { CheckoutSetShippingPayloadType } from "./checkout-setShipping.type";

export type CheckoutSummaryType = {
  items: [
    {
      product_variant_option_id: number;
      name: string;
      variant: {
        weight: number;
        color: string;
      };
      size: string;
      price: number;
      quantity: number;
      subtotal: number;
    },
  ];
  items_total: number;
  total_items_weight: number;
  shipping: CheckoutSetShippingPayloadType;
  shipping_cost: number | null;
  tax: {
    type: string;
    rate: number;
    amount: number;
  };
  grand_total: number;
};
