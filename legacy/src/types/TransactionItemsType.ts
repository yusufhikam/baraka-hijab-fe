import { ProductVariantsType } from "./productVariant";

export type TransactionItemsType = {
    id: number;
    transaction_id: number;
    productVariant: ProductVariantsType;
    quantity: number;
    subtotal: string;
}