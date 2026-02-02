import { CategoryType } from "./categoryType"
import { ProductThumbnailType } from "./productType"

export type SubCategoryCarouselType = {
    id: number,
    name: string,
    products: ProductThumbnailType[],
    category: CategoryType,
}