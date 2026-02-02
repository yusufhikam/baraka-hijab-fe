import { CategoryType } from "./category.type";
import { PhotoType } from "@/entities/photo/type/photo.type";

export interface SubCategoryType {
  id: number;
  name: string;
  slug: string;
  category: CategoryType;
}

export interface SubCategoryCarouselType extends SubCategoryType {
  products: {
    id: number;
    name: string;
    slug: string;
    thumbnail: string;
    product_variants: {
      id: number;
      photos: PhotoType[];
    }[];
  }[];
}
