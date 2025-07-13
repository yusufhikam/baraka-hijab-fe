
export type CheckoutType = {
    address_id: number | undefined;
    total_price: number;
    items: {
        product_variant_id: number;
        price: number;
        quantity: number;
    }[];
}