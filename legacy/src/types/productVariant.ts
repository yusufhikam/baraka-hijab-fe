import { ProductType } from "./productType";

export type ProductVariantsType = {
    id: number;
    stock: number;
    size: string;
    color: string;
    weight: number;
    product: ProductType;
}