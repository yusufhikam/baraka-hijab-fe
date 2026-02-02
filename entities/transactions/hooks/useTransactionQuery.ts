import { useQuery } from "@tanstack/react-query";
import transactionApi from "../api/transactionApi";

type UseTransactionsQueryProps = {
  hasMore?: boolean;
  cursor?: string | null;
};

export default function useTransactionQuery({
  hasMore,
  cursor,
}: UseTransactionsQueryProps = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", cursor],
    queryFn: () => transactionApi.getTransactions({ cursor, status: "all" }),
    staleTime: 60 * 60 * 10, //
    enabled: hasMore,
  });

  return { data, isLoading };
}
