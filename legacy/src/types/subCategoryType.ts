import { CategoryType } from "./categoryType";

export type SubCategoryType = {
    id: number;
    name: string;
    category: CategoryType;
}