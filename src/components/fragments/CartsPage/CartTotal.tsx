import { Loader } from "lucide-react";
import { useCart } from "../../../utililties/customHook/useCart";
import { Link } from "react-router-dom";
import useDarkMode from "../../../utililties/customHook/useDarkMode";

const CartTotal = () => {
    const { carts, isLoading, subTotal, formatCurrency } = useCart();
    const { isDarkMode } = useDarkMode();
    return (
        <div className={``}>
            <h1 className="text-2xl font-poppins-semibold mb-5">Cart Totals</h1>

            {isLoading ? (
                <Loader size={40} className="animate-spin mx-auto my-5 text-red-500" />
            ) : (
                carts && (
                    <>
                        <div className="flex flex-col text-xs">
                            <div className={`flex justify-between h-8 items-center px-2 border-b border-dashed ${isDarkMode ? 'bg-slate-500' : 'bg-gray-200'}`}>
                                <h1>Subtotal</h1>
                                <h1>{String(formatCurrency(subTotal))}</h1>
                            </div>
                            <div className="flex gap-2 justify-between h-fit py-1 items-center ps-2 border-b border-dashed">
                                <h1>Shipping</h1>
                                <p className={`text-xs text-right text-red-600  rounded px-2`}>Shipping cost are calculated during checkout</p>
                            </div>
                            <div className={`flex justify-between h-8 items-center text-xl font-semibold px-2 border-b-2 ${isDarkMode ? 'bg-slate-500' : 'bg-gray-200'}`}>
                                <h1>Total</h1>
                                <h1>{String(formatCurrency(subTotal))}</h1>
                            </div>
                        </div>

                        <Link to={'/checkout'} className={`bg-barakaprimary-madder  text-white px-4 py-1 rounded-md flex justify-center items-center mt-5 text-sm font-semibold transition-all duration-200
                            ${isDarkMode ? 'hover:bg-barakaprimary-snow hover:text-barakaprimary-madder' : 'hover:bg-black/80 hover:text-white'}`}>PROCEED TO CHECKOUT</Link>
                    </>
                )
            )}


        </div>
    )
}

export default CartTotal;