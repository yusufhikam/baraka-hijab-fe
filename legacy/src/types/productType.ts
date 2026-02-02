import { PhotosType } from './productPhoto'
import { ProductVariantsType } from './productVariant'
import { SubCategoryType } from './subCategoryType'

export type ProductType = {
    id: number
    name: string
    price: number
    slug: string
    description: string
    thumbnail: string
    is_ready: boolean
    sub_category: SubCategoryType
    product_variants: ProductVariantsType[]
    photos: PhotosType[]
}

// type for new arrivals & sub Categories carousel on Home Page
export type ProductThumbnailType = Pick<
    ProductType,
    'id' | 'name' | 'thumbnail' | 'slug'
>
