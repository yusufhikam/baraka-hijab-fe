import { Loader, Loader2, Trash2, X } from 'lucide-react'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import Button from '../../elements/Button/Button'
import { useCart } from '../../../utililties/customHook/useCart'
import { Quantity } from '../../elements/Quantity/Quantity'
import { memo, useCallback, useState } from 'react'
import { useAuth } from '../../../utililties/customHook/useAuth'
import { CartType } from '../../../types/CartType'
import handleDeleteItemCart from '../../../utililties/helper/ProductHelper/handleDeleteItemCart'
import { baseImageUrl } from '../../../utililties/api/urlBase'
import Modal from '../../elements/Modal/Modal'

type MiniDisplayCartListProps = {
    showMiniCart: boolean
    setShowMiniCart: React.Dispatch<React.SetStateAction<boolean>>
}
const MiniDisplayCartList = memo(
    ({ showMiniCart, setShowMiniCart }: MiniDisplayCartListProps) => {
        const { isDarkMode } = useDarkMode()
        const { carts, groupedCarts, subTotal, refreshCartData, isLoading } =
            useCart()
        const { isAuthenticated } = useAuth()

        const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
        const [quantity, setQuantity] = useState<Record<number, number>>({})

        const handleDeleteItem = useCallback(
            (cart: CartType) => {
                handleDeleteItemCart({
                    productVariantId: cart.productVariant.id,
                    isAuthenticated,
                    refreshCartData,
                    setIsLoadingDelete,
                })
            },
            [isAuthenticated, refreshCartData]
        )

        return (
            <Modal
                isOpen={showMiniCart}
                onClose={() => setShowMiniCart(false)}
                animationType="slideDown"
                variant={`fixed  border-none top-0 sm:top-20 md:top-16 w-full sm:w-[60%] lg:w-[40%] z-2 shadow-md p-2 sm:rounded-md transition-all duration-300  bg-gray-900 sm:bg-barakaprimary-snow text-white sm:text-black shadow-gray-500 ${carts?.length === 0 && 'flex flex-col items-center justify-center'}
            ${
                showMiniCart
                    ? `opacity-100  pointer-events-auto translate-x-0 inset-x-0 sm:inset-x-auto sm:right-5 max-h-full h-screen sm:h-fit ${carts?.length === 0 && 'sm:h-[10vh]'} sm:max-h-[80vh]`
                    : `opacity-0 pointer-events-none -translate-x-full -inset-x-full sm:inset-x-auto sm:-translate-x-0 sm:right-5 max-h-full h-screen sm:h-fit ${carts?.length === 0 && 'sm:h-[10vh]'} sm:max-h-0`
            }
            `}
            >
                <Button
                    type="button"
                    onClick={() => setShowMiniCart(false)}
                    variant="sm:hidden block"
                >
                    <X
                        size={40}
                        className={`absolute top-5 right-5 rounded-full transition-all duration-300 ${isDarkMode ? 'text-white hover:text-red-600' : 'hover:bg-white hover:text-red-500'}`}
                    />
                </Button>

                <div className="scrollbar-hide mt-16 flex max-h-[60vh] flex-col overflow-y-scroll sm:mt-0 sm:max-h-[50vh]">
                    {/* LOADER */}
                    {isLoading ? (
                        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2">
                            <Loader size={60} className="animate-spin" />
                            <h1 className="font-krona-one-regular animate-pulse">
                                Loading...
                            </h1>
                        </div>
                    ) : // DISPLAY CART DATA
                    carts && carts.length > 0 ? (
                        groupedCarts?.map((groupedCart, index) => {
                            return (
                                <div key={index}>
                                    <div
                                        className={`flex flex-row items-center justify-between gap-3 p-4 transition-all duration-300 hover:bg-gray-300/30`}
                                    >
                                        <div className="product-thumbnail sm:w-[30%]">
                                            <img
                                                src={`${baseImageUrl}/${groupedCart.product.thumbnail}`}
                                                alt={`${groupedCart.product.name}`}
                                                className="h-40 w-40 object-cover object-center"
                                            />
                                        </div>

                                        <div className="product-details flex w-[80%] flex-col gap-3">
                                            <h1 className="font-bold">
                                                {groupedCart.product.name}
                                            </h1>

                                            <h1 className="text-sm font-bold">
                                                Product Variants:{' '}
                                            </h1>
                                            {groupedCart.variants.map(
                                                (cart, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`relative flex flex-col justify-between rounded border border-gray-500 p-2 sm:flex-row ${isLoadingDelete && 'animate-pulse'}`}
                                                        >
                                                            <div className="flex flex-col">
                                                                <div className="flex gap-5 text-sm">
                                                                    <div className="flex flex-col">
                                                                        <p>
                                                                            Color:
                                                                        </p>
                                                                        <div
                                                                            className="h-6 w-6 rounded-full"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    cart
                                                                                        .productVariant
                                                                                        .color,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <p>
                                                                            Size:
                                                                        </p>
                                                                        <span className="font-bold">
                                                                            {
                                                                                cart
                                                                                    .productVariant
                                                                                    .size
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <p className="mt-2 w-fit">
                                                                    {Intl.NumberFormat(
                                                                        'en-EN',
                                                                        {
                                                                            style: 'currency',
                                                                            currency:
                                                                                'IDR',
                                                                            minimumFractionDigits: 0,
                                                                        }
                                                                    ).format(
                                                                        cart
                                                                            .productVariant
                                                                            .product
                                                                            .price
                                                                    )}
                                                                </p>
                                                            </div>

                                                            <div className="mt-3 flex items-center justify-between gap-1 lg:mt-0">
                                                                <Quantity
                                                                    variant="w-full sm:w-fit"
                                                                    productVariant={
                                                                        cart.productVariant
                                                                    }
                                                                    forEditQuantity={
                                                                        true
                                                                    }
                                                                    quantity={
                                                                        quantity
                                                                    }
                                                                    setQuantity={
                                                                        setQuantity
                                                                    }
                                                                />

                                                                <Button
                                                                    type="button"
                                                                    variant={`absolute sm:static top-2 right-2 p-1 rounded transition-all duration-300 text-red-500 hover:text-white hover:bg-red-500 `}
                                                                    onClick={() =>
                                                                        handleDeleteItem(
                                                                            cart
                                                                        )
                                                                    }
                                                                >
                                                                    {isLoadingDelete ? (
                                                                        <Loader2 className="animate-spin" />
                                                                    ) : (
                                                                        <Trash2 />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <hr className="border-gray-500" />
                                </div>
                            )
                        })
                    ) : (
                        // EMPTY CART
                        <h1 className="font-krona-one-regular text-center">
                            Your Cart is Empty
                        </h1>
                    )}
                </div>

                {showMiniCart && carts && carts.length > 0 && (
                    <div className="font-poppins-regular mt-5 flex flex-col gap-y-3">
                        <div className="flex items-center justify-between">
                            <h1 className="font-poppins-semibold text-2xl">
                                Sub Total:{' '}
                            </h1>
                            <p className="text-xl font-semibold">
                                {Intl.NumberFormat('en-EN', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                }).format(subTotal ?? 0)}
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant={`p-2 rounded-md transition-all duration-300 bg-barakaprimary-madder text-white hover:bg-barakaprimary-dessert hover:text-black`}
                        >
                            Checkout
                        </Button>
                        <Button
                            type="button"
                            variant={`p-2 text-center rounded-md transition-all duration-300 text-white sm:text-black border hover:border-none border-white sm:border-barakaprimary-madder hover:bg-barakaprimary-dessert hover:text-black`}
                            onClick={() => {
                                window.location.href = '/carts'
                                setShowMiniCart(false)
                            }}
                        >
                            View Carts Page
                        </Button>
                    </div>
                )}
            </Modal>
        )
    }
)

export default MiniDisplayCartList
