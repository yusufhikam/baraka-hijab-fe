import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { CartType } from "./CartType"

export type handleUpdateQuantityType = {
    id: number,
    value?: number | undefined,
    carts: CartType[] | null,
    isAuthenticated: boolean,
    forEditQuantity: boolean,
    refreshCartData: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<CartType[], Error>>,
    setQuantity: React.Dispatch<React.SetStateAction<Record<number, number>>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}