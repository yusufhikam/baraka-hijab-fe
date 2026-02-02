// import { ProductType } from "./productType";
import { ProductVariantsType } from "./productVariant";

export type CartType = {
    id: number;
    quantity: number;
    productVariant: ProductVariantsType;
}