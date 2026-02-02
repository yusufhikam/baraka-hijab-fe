import { Loader } from 'lucide-react'
import { useCart } from '../../../utililties/customHook/useCart'
import { Link } from 'react-router-dom'
import useDarkMode from '../../../utililties/customHook/useDarkMode'

const CartTotal = () => {
    const { carts, isLoading, subTotal, formatCurrency } = useCart()
    const { isDarkMode } = useDarkMode()
    return (
        <div className={``}>
            <h1 className="font-poppins-semibold mb-5 text-2xl">Cart Totals</h1>

            {isLoading ? (
                <Loader
                    size={40}
                    className="mx-auto my-5 animate-spin text-red-500"
                />
            ) : (
                carts && (
                    <>
                        <div className="flex flex-col text-xs">
                            <div
                                className={`flex h-8 items-center justify-between border-b border-dashed px-2 ${isDarkMode ? 'bg-zinc-500' : 'bg-gray-200'}`}
                            >
                                <h1>Subtotal</h1>
                                <h1>{String(formatCurrency(subTotal))}</h1>
                            </div>
                            <div className="flex h-fit items-center justify-between gap-2 border-b border-dashed py-1 ps-2">
                                <h1>Shipping</h1>
                                <p
                                    className={`rounded px-2 text-right text-xs text-red-600`}
                                >
                                    Shipping cost are calculated during checkout
                                </p>
                            </div>
                            <div
                                className={`flex h-8 items-center justify-between border-b-2 px-2 text-xl font-semibold ${isDarkMode ? 'bg-zinc-500' : 'bg-gray-200'}`}
                            >
                                <h1>Total</h1>
                                <h1>{String(formatCurrency(subTotal))}</h1>
                            </div>
                        </div>

                        <Link
                            to={'/checkout'}
                            className={`bg-barakaprimary-madder mt-5 flex items-center justify-center rounded-md px-4 py-1 text-sm font-semibold text-white transition-all duration-200 ${isDarkMode ? 'hover:bg-barakaprimary-snow hover:text-barakaprimary-madder' : 'hover:bg-black/80 hover:text-white'}`}
                        >
                            PROCEED TO CHECKOUT
                        </Link>
                    </>
                )
            )}
        </div>
    )
}

export default CartTotal
