import { useMutation, useQueryClient } from "@tanstack/react-query";
import postCheckout from "../api/Checkout/postCheckout";
import { CheckoutType } from "../../types/checkoutType";
import { useNavigate } from "react-router-dom";
import ToastSweetAlert from "../../components/elements/Alert/Toast/ToastSweetAlert";


export default function useCheckout() {

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { mutate: payment, isPending: isLoadingPayment } = useMutation({
        mutationFn: (data: CheckoutType) => postCheckout(data),
        onSuccess: (data) => {
            if (window.snap) {
                window.snap.pay(data.snap_token, {
                    onSuccess: () => {
                        navigate('/transaction/success?snap_token=' + data.snap_token, { replace: true })
                        ToastSweetAlert({
                            iconToast: 'success',
                            titleToast: 'Payment Success',
                        })

                        queryClient.invalidateQueries({ queryKey: ['carts'] })
                        queryClient.invalidateQueries({ queryKey: ['transactions'] })
                        queryClient.invalidateQueries({ queryKey: ['historyTransactions'] })
                    },
                    onError: () => {
                        ToastSweetAlert({
                            iconToast: 'error',
                            titleToast: 'Payment Failed',
                        })
                    },
                    onClose: () => {
                        // console.log('Payment closed');
                        queryClient.invalidateQueries({ queryKey: ['carts'] })
                        queryClient.invalidateQueries({ queryKey: ['transactions'] })

                        navigate('/transactions') // when closed the popup without finishing the payment
                    }
                })
            }
        }
    });

    const handlePayment = ({ address_id, total_price, items }: CheckoutType) => {
        payment({ address_id, total_price, items })
    }
    return { isLoadingPayment, handlePayment, payment }
}