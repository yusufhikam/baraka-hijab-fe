import { useQuery } from "@tanstack/react-query";
import transactionApi from "../api/transactionApi";

type ValidateTransactionProps = {
  order_id: string | null;
};

export default function useValidateTransasctionQuery({
  order_id,
}: ValidateTransactionProps) {
  return useQuery({
    queryKey: ["validate-transaction", order_id],
    queryFn: () => transactionApi.validateTransactionOwnership(order_id || ""),
    enabled: !!order_id,
    staleTime: 0,
    retry: false,
  });
}
