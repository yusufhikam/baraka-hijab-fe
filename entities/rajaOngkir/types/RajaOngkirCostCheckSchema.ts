import { COURIER_OPTIONS } from "@/constants/couriers";
import { z } from "zod";

export const RajaOngkirCostCheckSchema = z.object({
  destination: z.number().min(1, "Shipping destination is required"),
  weight: z.number().min(1, "Product weight is required"),
  courier: z.enum(COURIER_OPTIONS, "Please select a courier"),
});

export type RajaOngkirCostCheckPayloadType = z.infer<
  typeof RajaOngkirCostCheckSchema
>;

export type RajaOngkirCostCheckResponseType = {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
};
