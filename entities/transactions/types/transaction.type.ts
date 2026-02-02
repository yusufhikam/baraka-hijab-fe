import { TransactionItemType } from "./transactionItem";

export interface TransactionType {
  id: number;
  order_id: string;
  transaction_items: TransactionItemType[];
  status: "pending" | "paid" | "expire" | "canceled";
  total_price: number;
  snap_token: string;
  snap_url: string;
  create_at: string | null;
  paid_at: string | null;
  canceled_at: string | null;
  expired_at: string | null;
  payment_type: string | null;
}

export interface TransactionApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  meta: {
    next_cursor: string | null;
    prev_cursor: string | null;
    has_next: boolean;
    per_page: number;
    current_page_items: number;
  };
}
