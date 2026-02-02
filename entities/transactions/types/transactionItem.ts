export interface TransactionItemType {
  id: number;
  quantity: number;
  subtotal: number;
  product_variant_option: {
    id: number;
    size: string;
    stock: number;
    is_ready: boolean;
    product_variant: {
      id: number;
      color: string;
      product: {
        id: number;
        name: string;
        thumbnail: string;
        price: number;
        slug: string;
      };
    };
  };
}
