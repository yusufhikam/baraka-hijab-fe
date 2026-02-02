import React, { Suspense } from 'react'
import { useCart } from '../utililties/customHook/useCart'
import { ArrowLeftCircle, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/fragments/Breadcrumb/Breadcrumb'
import useDarkMode from '../utililties/customHook/useDarkMode'
import H1 from '../components/elements/Title Header/H1'

const CartTotal = React.lazy(
    () => import('../components/fragments/CartsPage/CartTotal')
)

const CartItems = React.lazy(
    () => import('../components/fragments/CartsPage/CartItems')
)
const CartsPage = () => {
    const { cartsLength, isLoading } = useCart()
    const { isDarkMode } = useDarkMode()

    return (
        <Suspense fallback={<Loader className="animate-spin" />}>
            <div
                className={`font-poppins-regular h-full px-5 py-5 ${!isDarkMode && 'bg-gray-200'}`}
            >
                <div className="my-8 flex items-center justify-center">
                    <Breadcrumb
                        links_breadcrumb={[
                            {
                                label: 'SHOPPING BAG',
                                link: '#',
                                isActive: true,
                                isAllowed: true,
                            },
                            {
                                label: 'CHECKOUT DETAILS',
                                link: '/checkout',
                                isActive: false,
                                isAllowed: cartsLength > 0 ? true : false,
                            },
                            {
                                label: 'ORDER COMPLETED',
                                link: '/checkout',
                                isActive: false,
                                isAllowed: false,
                            },
                        ]}
                    />
                </div>

                <div className="">
                    <p className="flex items-center gap-1">
                        <b>
                            {isLoading ? (
                                <Loader
                                    size={20}
                                    className="animate-spin text-red-500"
                                />
                            ) : (
                                `${cartsLength} ${cartsLength > 1 ? 'items' : 'item'}`
                            )}
                        </b>{' '}
                        in your bag
                    </p>
                </div>

                {cartsLength === 0 ? (
                    <div
                        className={`mt-2 flex h-[50vh] w-full flex-col items-center justify-center gap-5 rounded shadow-md ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`}
                    >
                        <H1>Your shopping bags is empty</H1>
                        <Link
                            to={'/shop/products'}
                            className={`group font-poppins-semibold hover:bg-barakaprimary-madder mx-auto flex w-fit items-center gap-2 rounded-md border-2 px-4 py-2 transition-all duration-200 md:mx-0 ${isDarkMode ? 'border-barakaprimary-snow text-white' : 'border-barakaprimary-madder text-barakaprimary-madder hover:text-white'}`}
                        >
                            <ArrowLeftCircle /> CONTINUE SHOPPING
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row">
                            {/* LEFT SECTION */}
                            <div className="flex h-full w-full flex-col gap-5 md:w-[65%]">
                                <CartItems />

                                <Link
                                    to={'/shop/products'}
                                    className={`group font-poppins-semibold hover:bg-barakaprimary-madder mx-auto flex w-fit items-center gap-2 rounded-md border-2 px-4 py-2 transition-all duration-200 md:mx-0 ${isDarkMode ? 'border-barakaprimary-snow text-white' : 'border-barakaprimary-madder text-barakaprimary-madder hover:text-white'}`}
                                >
                                    <ArrowLeftCircle /> CONTINUE SHOPPING
                                </Link>
                            </div>

                            {/* RIGHT SECTION */}
                            <div
                                className={`calculated-shipping sticky top-5 h-full w-full rounded-md px-2 pt-4 pb-2 md:w-[35%] ${isLoading && 'animate-pulse cursor-wait'} ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`}
                            >
                                <CartTotal />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Suspense>
    )
}

export default CartsPage
