import { Suspense } from "react";
import { useCart } from "../utililties/customHook/useCart";
import { ArrowLeftCircle, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import CartItems from "../components/fragments/CartsPage/CartItems";
import CartTotal from "../components/fragments/CartsPage/CartTotal";
import Breadcrumb from "../components/fragments/Breadcrumb/Breadcrumb";
import useDarkMode from "../utililties/customHook/useDarkMode";

const CartsPage = () => {
    const { cartsLength, isLoading } = useCart();
    const { isDarkMode } = useDarkMode();

    return (
        <Suspense fallback={<Loader className="animate-spin" />}>
            <div className={`h-full px-5 py-5 font-poppins-regular ${!isDarkMode && 'bg-gray-200'}`}>
                <div className="flex justify-center items-center my-8">
                    <Breadcrumb links_breadcrumb={[
                        { label: 'SHOPPING BAG', link: '#', isActive: true, isAllowed: true },
                        { label: 'CHECKOUT DETAILS', link: '/checkout', isActive: false, isAllowed: true },
                        { label: 'ORDER COMPLETED', link: '/checkout', isActive: false, isAllowed: false }
                    ]} />
                </div>

                <div className="">
                    <p className="flex gap-1 items-center"><b>
                        {isLoading ? (
                            <Loader size={20} className="animate-spin text-red-500" />
                        ) : (
                            `${cartsLength} ${cartsLength > 1 ? 'items' : 'item'}`
                        )}
                    </b> in your bag</p>
                </div>
                <div className="flex flex-col md:flex-row gap-5 justify-between mt-2">

                    {/* LEFT SECTION */}
                    <div className="flex flex-col gap-5 h-full w-full  md:w-[65%]">

                        <CartItems />

                        <Link to={'/shop/products'} className={`group mx-auto md:mx-0 flex items-center gap-2 border-2    w-fit px-4 py-2 rounded-md transition-all duration-200 font-poppins-semibold hover:bg-barakaprimary-madder
                            ${isDarkMode ? 'border-barakaprimary-snow text-white' : 'border-barakaprimary-madder  hover:text-white text-barakaprimary-madder'}`}>
                            <ArrowLeftCircle /> CONTINUE SHOPPING
                        </Link>

                    </div>

                    {/* RIGHT SECTION */}
                    <div className={`calculated-shipping sticky top-5 h-full pt-4 pb-2 px-2 w-full  md:w-[35%] rounded-md ${isLoading && 'animate-pulse cursor-wait '}
                    ${isDarkMode ? 'bg-slate-700' : 'bg-white'}`}>
                        <CartTotal />
                    </div>
                </div>
            </div>


        </Suspense >
    )
}

export default CartsPage;