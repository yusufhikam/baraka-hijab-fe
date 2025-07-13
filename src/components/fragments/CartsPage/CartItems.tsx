import { memo, useCallback, useState } from 'react'
import { baseImageUrl } from '../../../utililties/api/urlBase'
import { useCart } from '../../../utililties/customHook/useCart'
import { Quantity } from '../../elements/Quantity/Quantity'
import Button from '../../elements/Button/Button'
import { Loader, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import handleDeleteItemCart from '../../../utililties/helper/ProductHelper/handleDeleteItemCart'
import { CartType } from '../../../types/CartType'
import { useAuth } from '../../../utililties/customHook/useAuth'

const CartItems = memo(() => {
    const {
        carts,
        isLoading,
        formatCurrency,
        subTotalPerVariant,
        refreshCartData,
    } = useCart()
    const { isAuthenticated } = useAuth()
    const [quantity, setQuantity] = useState<Record<number, number>>({})
    const { isDarkMode } = useDarkMode()
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

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
        <div
            className={`cart-items-container gap-3 overflow-x-auto rounded-md p-5 shadow-lg shadow-black/25 ${isDarkMode ? 'bg-zinc-700' : 'bg-white'} ${isLoading && 'animate-pulse cursor-wait'}`}
        >
            <h1 className="font-poppins-semibold mb-5 text-2xl">Cart Items</h1>

            {isLoading ? (
                <Loader
                    size={40}
                    className="mx-auto my-5 animate-spin text-red-500"
                />
            ) : (
                <table className="w-full table-auto">
                    <thead className="border-b-2 text-lg">
                        <tr className="">
                            <th className="text-center sm:text-left">
                                Product
                            </th>
                            <th className="hidden sm:block">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="hidden sm:block">Total</th>
                            <th className=""></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts &&
                            carts.map((cart, index) => (
                                <tr
                                    key={index}
                                    className={`border-b transition-all duration-200 hover:bg-gray-300/25 ${isLoadingDelete && 'animate-pulse'}`}
                                >
                                    <td className="table-cell px-1 py-5">
                                        <Link
                                            to={`/shop/product/${cart.productVariant.product.slug}`}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="product_img min-w-16">
                                                <img
                                                    src={`${baseImageUrl}/${cart.productVariant.product.thumbnail}`}
                                                    alt={`${cart.productVariant.product.name}`}
                                                    className="h-28 w-16 rounded-md object-cover sm:h-24 md:h-28 lg:h-22"
                                                />
                                            </div>
                                            <div className="product-details flex w-full flex-col justify-between">
                                                <div className="flex flex-col">
                                                    <h1 className="text-xs font-bold opacity-35">
                                                        {
                                                            cart.productVariant
                                                                .product
                                                                .subCategory
                                                                .category.name
                                                        }
                                                    </h1>
                                                    <h1 className="text-lg font-bold">
                                                        {
                                                            cart.productVariant
                                                                .product.name
                                                        }
                                                    </h1>
                                                </div>
                                                <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:items-center">
                                                    <div className="mt-5 flex items-center gap-2">
                                                        <div
                                                            className="h-3 w-3 rounded"
                                                            style={{
                                                                backgroundColor:
                                                                    cart
                                                                        .productVariant
                                                                        .color,
                                                            }}
                                                        ></div>
                                                        <span>|</span>
                                                        <p className="">
                                                            {
                                                                cart
                                                                    .productVariant
                                                                    .size
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1 sm:hidden">
                                                        <p>{cart.quantity}</p>
                                                        <span>x</span>
                                                        <h1 className="font-semibold">
                                                            {String(
                                                                formatCurrency(
                                                                    cart
                                                                        .productVariant
                                                                        .product
                                                                        .price
                                                                )
                                                            )}
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="price hidden px-1 sm:table-cell">
                                        <h1 className="my-auto text-center">
                                            {Intl.NumberFormat('en-EN', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                            }).format(
                                                cart.productVariant.product
                                                    .price
                                            )}
                                        </h1>
                                    </td>
                                    <td className="quantity">
                                        <Quantity
                                            variant="w-full"
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                            forEditQuantity={true}
                                            productVariant={cart.productVariant}
                                        />
                                    </td>
                                    <td className="price hidden px-1 sm:table-cell">
                                        <h1 className="text-center font-bold">
                                            {String(
                                                subTotalPerVariant(
                                                    cart.productVariant.id
                                                )
                                            )}
                                        </h1>
                                    </td>
                                    <td className="table-cell text-center">
                                        <Button
                                            type="button"
                                            variant="hover:bg-barakaprimary-madder hover:text-white w-fit h-fit p-1 rounded-md my-auto transition-all duration-200"
                                            onClick={() =>
                                                handleDeleteItem(cart)
                                            }
                                        >
                                            {isLoadingDelete ? (
                                                <Loader className="animate-spin" />
                                            ) : (
                                                <Trash2 className="text-red-500 hover:text-white" />
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    )
})

export default CartItems
