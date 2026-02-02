import { COURIER_OPTIONS } from "@/constants/couriers";

export type CheckoutSetShippingPayloadType = {
  courier: (typeof COURIER_OPTIONS)[number];
  service: string;
  cost: number;
  etd: string;
};
