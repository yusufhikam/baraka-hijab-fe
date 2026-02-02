import { PhotoType } from "@/entities/photo/type/photo.type";
import { ProductVariantOptionType } from "./productVariantOption.type";

export interface ProductVariantType {
  id: number;
  name: string;
  color: string;
  weight: number;
  variant_options: ProductVariantOptionType[];
  photos: PhotoType[];
}
