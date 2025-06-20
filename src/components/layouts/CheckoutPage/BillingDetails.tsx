import { Fragment } from 'react/jsx-runtime'
import { useCart } from '../../../utililties/customHook/useCart'
import H1 from '../../elements/Title Header/H1'
import { calculateCostType } from '../../../utililties/api/CekOngkir/cekOngkir'
import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import useDarkMode from '../../../utililties/customHook/useDarkMode'

type BillingDetailsProps = {
    selectedCourier: calculateCostType | null
}

const BillingDetails = ({ selectedCourier }: BillingDetailsProps) => {
    const { isDarkMode } = useDarkMode()
    const { carts, subTotalPerVariant, formatCurrency, subTotal, isLoading } =
        useCart()

    const TotalPayment = useMemo(() => {
        if (selectedCourier) {
            return subTotal + selectedCourier.cost
        } else {
            return subTotal
        }
    }, [subTotal, selectedCourier])

    return (
        <>
            <H1>Your Orders</H1>

            <div
                className={`mt-8 flex w-full flex-wrap items-center gap-2 ${isLoading && 'h-56 animate-pulse rounded-md bg-zinc-200'}`}
            >
                {isLoading ? (
                    <Loader2
                        size={50}
                        className="text-barakaprimary-madder mx-auto animate-spin"
                    />
                ) : (
                    <>
                        {/* ORDER DETAIL */}

                        <div className="grid w-full grid-cols-2">
                            <div
                                className={`col-span-1 mb-2 border-b-2 ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
                            >
                                <H1
                                    fontSize="text-md"
                                    fontWeight="font-semibold"
                                >
                                    PRODUCT
                                </H1>
                            </div>
                            <div
                                className={`col-span-1 mb-2 border-b-2 text-right ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
                            >
                                <H1
                                    fontSize="text-md"
                                    fontWeight="font-semibold"
                                >
                                    SUBTOTAL
                                </H1>
                            </div>
                            {carts &&
                                carts.map((cart, index) => (
                                    <Fragment key={index}>
                                        <div
                                            className={`col-span-1 mb-2 border-b py-1 ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
                                        >
                                            <p className="flex items-center gap-2 text-xs">
                                                {
                                                    cart.productVariant.product
                                                        .name
                                                }{' '}
                                                <span className="text-xs font-bold">
                                                    x {cart.quantity}
                                                </span>
                                            </p>
                                        </div>
                                        <div
                                            className={`col-span-1 mb-2 border-b py-1 text-right ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
                                        >
                                            <p className="text-xs">
                                                {String(
                                                    subTotalPerVariant(
                                                        cart.productVariant.id
                                                    )
                                                )}
                                            </p>
                                        </div>
                                    </Fragment>
                                ))}
                        </div>

                        {/* TOTAL PAYMENT */}

                        <div
                            className={`flex w-full flex-col gap-3 border-b-2 py-1 ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
                        >
                            <div className="flex justify-between">
                                <H1 fontSize="text-xs">Subtotal</H1>
                                <H1 fontSize="text-xs">
                                    {String(formatCurrency(subTotal))}
                                </H1>
                            </div>
                            <div className="flex items-center justify-between">
                                <H1 fontSize="text-xs gap-2 flex">
                                    Shipping{' '}
                                    <span
                                        className={`${selectedCourier ? 'block' : 'hidden'} text-xm font-normal text-red-500`}
                                    >
                                        [
                                        {selectedCourier?.code.toLocaleUpperCase()}
                                        {' : '}
                                        {selectedCourier?.service}]
                                    </span>
                                </H1>
                                <p
                                    className={`text-xs font-bold ${!selectedCourier && 'rounded-xs border border-red-500 bg-red-500/20 px-2 font-normal text-red-500'}`}
                                >
                                    {selectedCourier
                                        ? String(
                                              formatCurrency(
                                                  selectedCourier.cost
                                              )
                                          )
                                        : 'Please select a courier first'}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <H1 fontSize="text-xs">Total</H1>
                                <H1 fontSize="text-xs">
                                    {String(formatCurrency(TotalPayment))}
                                </H1>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default BillingDetails
