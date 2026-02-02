import { ProductType } from "@/entities/product/types/product.type";
import { ProductVariantType } from "@/entities/product/types/productVariant.type";
import { ProductVariantOptionType } from "@/entities/product/types/productVariantOption.type";
import { z } from "zod";

export const cartPayloadSchema = z.object({
  // user_id: z.number().int().positive().optional().nullable(),
  product_variant_option_id: z.number().int().positive(),
  quantity: z.number().int().min(1),
});

export type CartPayloadType = z.infer<typeof cartPayloadSchema>;

export interface CartTypeResponse {
  id: number;
  quantity: number;
  product: Pick<ProductType, "id" | "name" | "slug" | "thumbnail" | "price">;
  product_variant: ProductVariantType;
  variant_option: ProductVariantOptionType;
}

export type GuestCartPayloadType = {
  quantity: number;
  product: Pick<ProductType, "id" | "name" | "slug" | "thumbnail" | "price">;
  product_variant: Omit<ProductVariantType, "photos" | "variant_options">;
  variant_option: Omit<ProductVariantOptionType, "is_ready">;
};

export type GroupedCartByProductType = {
  product: CartTypeResponse["product"];
  product_variants: {
    id: number;
    name: string;
    color: string;
    weight: number;
    variant_options: {
      id: number;
      size: string;
      stock: number;
      quantity: number;
    }[];
  }[];
  total_quantity: number;
};

export type SyncCartType = {
  carts: CartPayloadType[];
};
