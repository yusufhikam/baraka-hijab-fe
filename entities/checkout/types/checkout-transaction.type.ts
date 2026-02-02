export interface CheckoutTransactionResponseType {
  id: number;
  order_id: string;
  user_id: number;
  address_id: number;
  status: string;
  total_price: string;
  snap_token: string;
  snap_url: string;
  payment_type: string | null;
  payment_status: string | null;
  payment_code: string | null;
  expired_at: Date;
  paid_at: Date | null;
  created_at: Date;
  canceled_at: Date | null;
  updated_at: Date;
}
