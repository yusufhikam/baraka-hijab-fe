import { Loader2 } from 'lucide-react'
import { useCart } from '../../../utililties/customHook/useCart'
import useTransactions from '../../../utililties/customHook/useTransactions'
import H1 from '../../elements/Title Header/H1'
import Button from '../../elements/Button/Button'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import { userTransactionsType } from '../../../types/userTransactionsType'
import { useQueryClient } from '@tanstack/react-query'
import ToastSweetAlert from '../../elements/Alert/Toast/ToastSweetAlert'
import { useNavigate } from 'react-router-dom'

const TransactionsLayout = () => {
    const {
        transactions,
        isLoadingTransactions,
        cancelTransaction,
        isLoadingCancel,
    } = useTransactions()

    const { formatCurrency } = useCart()
    const { isDarkMode } = useDarkMode()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // handle payment
    const handlePay = (transaction: userTransactionsType) => {
        if (window.snap) {
            window.snap.pay(transaction.snap_token, {
                onSuccess: () => {
                    navigate(
                        '/transaction/success?snap_token=' +
                            transaction.snap_token,
                        { replace: true }
                    )
                },
                onError: () => {
                    ToastSweetAlert({
                        iconToast: 'error',
                        titleToast: 'Payment Failed',
                    })
                },
                onClose: () => {
                    ToastSweetAlert({
                        iconToast: 'info',
                        titleToast: 'You closed the payment popup',
                    })
                },
            })
        } else {
            window.open(transaction.snap_url, '_blank') // fallback
        }

        if (transaction.status === 'paid') {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        }
    }

    // handle cancel transaction
    const handleCancel = (orderId: string) => {
        cancelTransaction(orderId)
    }

    return isLoadingTransactions ? (
        <div
            className={`flex h-[50vh] items-center justify-center gap-2 ${isLoadingTransactions && 'animate-pulse bg-gray-300'}`}
        >
            <Loader2
                size={50}
                className="text-barakaprimary-madder animate-spin"
            />
            <H1>Loading Data...</H1>
        </div>
    ) : transactions && transactions.length > 0 ? (
        <div
            className={`z-[2] w-full overflow-hidden overflow-x-auto ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`}
        >
            <table className="w-full min-w-max border-collapse border">
                <thead
                    className={` ${isDarkMode ? 'text-white' : 'bg-gray-300 text-black'} `}
                >
                    <tr>
                        <th className="border p-1">Order ID</th>
                        <th className="border p-1">Product Item</th>
                        <th className="border p-1">Price</th>
                        <th className="border p-1">Total</th>
                        <th className="border p-1">Payment Type</th>
                        <th className="border p-1">Status</th>
                        <th className="border p-1">Created At</th>
                        <th className="border p-1">Expired At</th>
                        <th className="border p-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions &&
                        transactions.map((transaction) => {
                            return (
                                <tr key={transaction.id}>
                                    <td className="border p-2 text-center">
                                        {transaction.order_id}
                                    </td>
                                    <td className="border text-center">
                                        {transaction.transactionItems.map(
                                            (item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-2 border-b p-2"
                                                >
                                                    <p>
                                                        {
                                                            item.productVariant
                                                                .product.name
                                                        }
                                                    </p>
                                                    <p className="font-semibold">
                                                        x {item.quantity}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </td>
                                    <td className="border text-center">
                                        {transaction.transactionItems.map(
                                            (item) => (
                                                <div
                                                    key={item.id}
                                                    className="border-b p-2"
                                                >
                                                    <p>
                                                        {String(
                                                            formatCurrency(
                                                                item
                                                                    .productVariant
                                                                    .product
                                                                    .price
                                                            )
                                                        )}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </td>
                                    <td className="border p-2 text-center">
                                        {String(
                                            formatCurrency(
                                                Number(transaction.total_price)
                                            )
                                        )}
                                    </td>
                                    <td className="border p-2 text-center">
                                        <p
                                            className={`mx-auto w-fit rounded border border-blue-500 bg-blue-500 px-2 font-semibold text-white`}
                                        >
                                            {transaction.payment_type}
                                        </p>
                                    </td>
                                    <td className="border p-2 text-center">
                                        <p
                                            className={`mx-auto w-fit rounded px-2 font-semibold ${transaction.status === 'pending' && 'border bg-orange-300 text-orange-600'} ${transaction.status === 'paid' && 'border bg-green-300 text-green-600'} ${transaction.status === 'expired' && 'border bg-red-300 text-red-600'}`}
                                        >
                                            {transaction.status.toLocaleUpperCase()}
                                        </p>
                                    </td>
                                    <td className="w-1/6 border text-center">
                                        <div className="mx-auto w-1/2 text-sm">
                                            <p>
                                                {transaction.created_at
                                                    ? new Intl.DateTimeFormat(
                                                          'en-US',
                                                          {
                                                              month: 'long',
                                                              year: 'numeric',
                                                              day: '2-digit',
                                                              hour: '2-digit',
                                                              minute: '2-digit',
                                                              second: '2-digit',
                                                              timeZone:
                                                                  'Asia/Jakarta',
                                                          }
                                                      ).format(
                                                          new Date(
                                                              transaction.created_at
                                                          )
                                                      )
                                                    : '-'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="w-1/6 border text-center">
                                        <div className="mx-auto w-1/2 text-sm">
                                            <p>
                                                {transaction.expired_at
                                                    ? new Intl.DateTimeFormat(
                                                          'en-US',
                                                          {
                                                              month: 'long',
                                                              year: 'numeric',
                                                              day: '2-digit',
                                                              hour: '2-digit',
                                                              minute: '2-digit',
                                                              second: '2-digit',
                                                              timeZone:
                                                                  'Asia/Jakarta',
                                                          }
                                                      ).format(
                                                          new Date(
                                                              transaction.expired_at
                                                          )
                                                      )
                                                    : '-'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="border">
                                        <div className="flex w-full items-center justify-center gap-2 p-2">
                                            <Button
                                                type="button"
                                                variant="bg-green-500 w-full hover:bg-green-600 px-2 rounded-sm text-white "
                                                onClick={() =>
                                                    handlePay(transaction)
                                                }
                                            >
                                                Pay
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={`bg-red-500 w-full hover:bg-red-600 px-2 rounded-sm text-white ${isLoadingCancel && 'cursor-wait animate-pulse'}`}
                                                onClick={() =>
                                                    handleCancel(
                                                        transaction.order_id
                                                    )
                                                }
                                            >
                                                {isLoadingCancel ? (
                                                    <Loader2 className="mx-auto animate-spin p-1" />
                                                ) : (
                                                    'Cancel'
                                                )}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="flex h-[50vh] items-center justify-center gap-2">
            <H1>No Transaction Found</H1>
        </div>
    )
}

export default TransactionsLayout
