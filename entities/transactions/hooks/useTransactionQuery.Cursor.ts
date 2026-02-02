import {
  TransactionApiResponse,
  TransactionType,
} from "../types/transaction.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import transactionApi from "../api/transactionApi";
import { TransactionsQueryParams } from "../types/transactionQueryParam.type";

type UseTransactionCursorQuery = {
  per_page?: number;
  status?: TransactionsQueryParams["status"];
};

export default function useTransactionCursorQuery({
  per_page = 10,
  status = "all",
}: UseTransactionCursorQuery = {}) {
  return useInfiniteQuery<TransactionApiResponse<TransactionType[]>>({
    queryKey: ["transactions", { status, per_page }],
    queryFn: async ({ pageParam }) => {
      return transactionApi.getTransactions({
        cursor: pageParam as string,
        per_page: per_page,
        status,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.has_next ? lastPage.meta.next_cursor : undefined;
    },
    initialPageParam: undefined,
  });
}
