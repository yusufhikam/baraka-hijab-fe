import { Loader2 } from 'lucide-react'
import { useCart } from '../../../utililties/customHook/useCart'
import H1 from '../../elements/Title Header/H1'
import useTransactions from '../../../utililties/customHook/useTransactions'

const TransactionsHistoryLayout = () => {
    const { historyTransactions, isLoadingHistoryTransactions } =
        useTransactions()
    const { formatCurrency } = useCart()
    return isLoadingHistoryTransactions ? (
        <div
            className={`flex h-[50vh] items-center justify-center gap-2 ${isLoadingHistoryTransactions && 'animate-pulse bg-gray-300'}`}
        >
            <Loader2
                size={50}
                className="text-barakaprimary-madder animate-spin"
            />
            <H1>Loading Data...</H1>
        </div>
    ) : historyTransactions && historyTransactions.length > 0 ? (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-max border-collapse border">
                <thead>
                    <tr>
                        <th className="border">Order ID</th>
                        <th className="border">Product Item</th>
                        <th className="border">Price</th>
                        <th className="border">Total</th>
                        <th className="border">Payment Type</th>
                        <th className="border">Status</th>
                        <th className="border">Created At</th>
                        <th className="border">Paid At</th>
                        <th className="border">Canceled At</th>
                    </tr>
                </thead>
                <tbody>
                    {historyTransactions &&
                        historyTransactions.map((transaction) => {
                            return (
                                <tr key={transaction.id}>
                                    <td className="border p-2 text-center">
                                        {transaction.order_id}
                                    </td>
                                    <td className="border px-2 py-1 text-center">
                                        {transaction.transactionItems.map(
                                            (item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-2"
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
                                    <td className="border p-2 text-center">
                                        {transaction.transactionItems.map(
                                            (item) => (
                                                <div key={item.id}>
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
                                            className={`mx-auto w-fit rounded px-2 font-semibold ${transaction.status === 'pending' && 'border bg-orange-300 text-orange-600'} ${transaction.status === 'paid' && 'border bg-green-300 text-green-600'} ${transaction.status === 'expired' && 'border bg-red-300 text-red-600'} ${transaction.status === 'canceled' && 'border bg-red-300 text-red-600'}`}
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
                                                {transaction.paid_at
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
                                                              transaction.paid_at
                                                          )
                                                      )
                                                    : '-'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="w-1/6 border text-center">
                                        <div className="mx-auto w-1/2 text-sm">
                                            <p>
                                                {transaction.canceled_at
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
                                                              transaction.canceled_at
                                                          )
                                                      )
                                                    : '-'}
                                            </p>
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

export default TransactionsHistoryLayout
