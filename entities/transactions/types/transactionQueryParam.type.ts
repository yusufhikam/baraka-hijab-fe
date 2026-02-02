export type TransactionsQueryParams = {
  cursor: string | null | undefined;
  per_page?: number;
  status: "all" | "pending" | "paid" | "expire" | "canceled";
};
