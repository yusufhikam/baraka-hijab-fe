import { Fragment } from 'react/jsx-runtime'
import { useCart } from '../../../utililties/customHook/useCart'
import H1 from '../../elements/Title Header/H1'
import { calculateCostType } from '../../../utililties/api/CekOngkir/cekOngkir'
import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import Button from '../../elements/Button/Button'
import useCheckout from '../../../utililties/customHook/useCheckout'
import usePrimaryAddress from '../../../utililties/customHook/usePrimaryAddress'
import ToastSweetAlert from '../../elements/Alert/Toast/ToastSweetAlert'
import { CheckoutType } from '../../../types/checkoutType'

type BillingDetailsProps = {
    selectedCourier: calculateCostType | null
}

const BillingDetails = ({ selectedCourier }: BillingDetailsProps) => {
    const { isDarkMode } = useDarkMode()
    // get primary address
    const { primaryAddress } = usePrimaryAddress()
    // handle cart items
    const { carts, subTotalPerVariant, formatCurrency, subTotal, isLoading } =
        useCart()
    // handle checkout payment
    const { handlePayment, isLoadingPayment } = useCheckout()

    const TotalPayment = useMemo(() => {
        if (selectedCourier) {
            return subTotal + selectedCourier.cost
        } else {
            return subTotal
        }
    }, [subTotal, selectedCourier])

    const handleCheckout = () => {
        if (!carts || carts.length === 0) {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed to checkout, your cart is empty',
            })

            return
        }

        if (!primaryAddress) {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed to checkout, please add your address',
            })
            return
        }

        const payload: CheckoutType = {
            address_id: primaryAddress.id,
            total_price: TotalPayment,
            items: carts.map((item) => ({
                product_variant_id: item.productVariant.id,
                price: item.productVariant.product.price,
                quantity: item.quantity,
            })),
        }

        handlePayment(payload)
    }

    return carts?.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center">
            <H1 fontSize="text-2xl" fontWeight="font-semibold">
                Your shopping bag is empty
            </H1>
        </div>
    ) : (
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
                        <Button
                            disabled={!selectedCourier}
                            type="submit"
                            variant={`flex gap-2 items-center justify-center bg-barakaprimary-madder text-white w-full rounded-sm py-1 font-poppins-bold 
                            
                                ${
                                    !selectedCourier
                                        ? 'cursor-not-allowed opacity-50'
                                        : isDarkMode
                                          ? 'hover:bg-barakaprimary-snow hover:text-barakaprimary-madder'
                                          : 'hover:bg-zinc-800'
                                }
                                ${isLoadingPayment && 'animate-pulse cursor-wait'}
                                `}
                            onClick={handleCheckout}
                        >
                            {isLoadingPayment ? (
                                <>
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />
                                    <p>PROCESSING</p>
                                </>
                            ) : (
                                'CHECKOUT'
                            )}
                        </Button>
                    </>
                )}
            </div>
        </>
    )
}

export default BillingDetails
