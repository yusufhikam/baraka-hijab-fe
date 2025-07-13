import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import getUserTransactions from "../api/Transactions/getUserTransactions"
import getUserHistoryTransactions from "../api/Transactions/getUserHistoryTransactions"
import postCanceledTransaction from "../api/Transactions/postCanceledTransaction"
import ToastSweetAlert from "../../components/elements/Alert/Toast/ToastSweetAlert"

const useTransactions = () => {

    const queryClient = useQueryClient()

    // get 'pending' user transactions
    const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getUserTransactions(),
        staleTime: 1000 * 60 * 5, // for 5 minutes
    })

    // get user history transactions [expired, canceled, paid]
    const { data: historyTransactions, isLoading: isLoadingHistoryTransactions } = useQuery({
        queryKey: ['historyTransactions'],
        queryFn: () => getUserHistoryTransactions(),
        staleTime: 1000 * 60 * 5, // for 5 minutes
    })

    // post cancel user transaction
    const { mutate: cancelTransaction, isPending: isLoadingCancel, } = useMutation({
        mutationFn: (orderId: string) => postCanceledTransaction(orderId),
        onSuccess: () => {
            ToastSweetAlert({
                iconToast: 'success',
                titleToast: `Transaction successfully canceled`,
            })

            queryClient.invalidateQueries({ queryKey: ['transactions'] })
            queryClient.invalidateQueries({ queryKey: ['historyTransactions'] })
        }
    })

    return {
        transactions,
        isLoadingTransactions,
        historyTransactions,
        isLoadingHistoryTransactions,
        cancelTransaction,
        isLoadingCancel
    }
}


export default useTransactions