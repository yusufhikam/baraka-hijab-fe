import { SubCategoryType } from "@/entities/category/types/subCategory.type";
import { ProductVariantType } from "./productVariant.type";

export interface ProductType {
  id: number;
  name: string;
  slug: string;
  price: number;
  variant_stock: number;
  description: string;
  thumbnail: string;
  sub_category: SubCategoryType;
  product_variants: ProductVariantType[];
}

export interface ProductTypeResponse {
  current_page: number;
  last_page: number;
  total: number;
  data: ProductType[];
}

export type ProductNewArrivalType = Pick<
  ProductType,
  "id" | "name" | "slug" | "thumbnail"
>;
