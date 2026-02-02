import { TransactionItemsType } from "./TransactionItemsType";

export type userTransactionsType = {
    id: number;
    order_id: string;
    user_id: number;
    status: string;
    total_price: string;
    snap_token: string;
    snap_url: string;
    paid_at: string;
    expired_at: string;
    created_at: string;
    canceled_at: string;
    payment_type: string;
    transactionItems: TransactionItemsType[];
}

