import { SubCategoryType } from "./subCategory.type";

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  subCategories?: SubCategoryType[];
}
