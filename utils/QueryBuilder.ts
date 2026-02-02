import { ProductParamsQuery } from "@/entities/product/types/productParamQuery.type";
import { TransactionsQueryParams } from "@/entities/transactions/types/transactionQueryParam.type";

export default function buildQueryString(
  query: ProductParamsQuery | TransactionsQueryParams,
) {
  const queryParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  return queryParams.toString();
}
