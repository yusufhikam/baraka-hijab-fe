import { z } from "zod";

export const AddressSchema = z.object({
  recipient_name: z.string().min(1, "Recipient name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  province_id: z.string().min(1, "Province is required"),
  province_name: z.string().min(1, "Province name is required"),
  city_id: z.string().min(1, "City is required"),
  city_name: z.string().min(1, "City name is required"),
  district_id: z.string().min(1, "District is required"),
  district_name: z.string().min(1, "District name is required"),
  subdistrict_id: z.string().min(1, "Subdistrict is required"),
  subdistrict_name: z.string().min(1, "Subdistrict name is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  detail: z.string().nullable(),
  mark_as: z.enum(["home", "office", "store"]),
});

export type AddressSchemaPayloadType = z.infer<typeof AddressSchema>;
