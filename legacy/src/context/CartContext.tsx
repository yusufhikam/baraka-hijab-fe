import { createContext, useCallback, useMemo } from 'react'
import { useAuth } from '../utililties/customHook/useAuth'
import { CartType } from '../types/CartType'
import getDataCarts from '../utililties/api/carts/getDataCarts'
import {
    QueryObserverResult,
    RefetchOptions,
    useQuery,
} from '@tanstack/react-query'
import { ProductType } from '../types/productType'

type CartContextType = {
    carts: CartType[] | null
    cartsLength: number | 0
    subTotal: number
    subTotalPerVariant: (id: CartType['productVariant']['id']) => void
    refreshCartData: (
        options?: RefetchOptions
    ) => Promise<QueryObserverResult<CartType[], Error>>
    isLoading: boolean
    isError: boolean
    groupedCarts: groupedCartType[] | undefined
    formatCurrency: (number: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

type CartProviderProps = {
    children: React.ReactNode
}

type groupedCartType = {
    product: ProductType
    variants: CartType[]
}
export const CartProvider = ({ children }: CartProviderProps) => {
    const { isAuthenticated } = useAuth()

    const {
        data: carts = [],
        isLoading,
        isError,
        refetch: refreshCartData,
    } = useQuery({
        queryKey: ['carts', isAuthenticated],
        queryFn: () => getDataCarts(isAuthenticated),
        enabled: true,
        staleTime: 1000 * 60 * 5,
    })

    // console.log(carts);

    // menghitung total cart
    const cartsLength = carts.length

    // mengelompokkan cart jika ada cart dengan product yang sama tapi beda variant
    const groupedCarts: groupedCartType[] | undefined = useMemo(() => {
        return carts?.reduce((acc: groupedCartType[], cart) => {
            const productId = cart.productVariant.product.id

            const existingGroup = acc.find(
                (group) => group.product.id === productId
            )
            if (existingGroup) {
                existingGroup.variants.push(cart)
            } else {
                acc.push({
                    product: cart.productVariant.product,
                    variants: [cart],
                })
            }

            return acc
        }, [])
    }, [carts])

    // menghitung subTotal all item carts
    const subTotal = useMemo(() => {
        return carts.reduce(
            (acc, cart) =>
                acc + cart.productVariant.product.price * cart.quantity,
            0
        )
    }, [carts])

    // menghitung subTotal per product variant, // when called wrap with String(subTotalPerVariant(id))
    const subTotalPerVariant = useCallback(
        (id: CartType['productVariant']['id'] | undefined) => {
            // id === productVariant.id
            const total = carts
                .filter((cart) => cart.productVariant.id === id)
                .reduce(
                    (acc, cart) =>
                        acc + cart.productVariant.product.price * cart.quantity,
                    0
                )
            return formatCurrency(total)
        },
        [carts]
    )

    // number formater for price
    const formatCurrency = (number: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number)
    }

    return (
        <CartContext.Provider
            value={{
                carts,
                cartsLength,
                subTotal,
                refreshCartData,
                isLoading,
                isError,
                groupedCarts,
                subTotalPerVariant,
                formatCurrency,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartContext
