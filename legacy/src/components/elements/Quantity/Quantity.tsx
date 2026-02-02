import { Loader2, MinusCircle, PlusCircle } from "lucide-react"
import Button from "../Button/Button"
import React, { useId, useState } from "react"
import { ProductVariantsType } from "../../../types/productVariant"
import { handleIncrementQuantity } from "../../../utililties/helper/ProductHelper/handleIncrementQuantity"
import { handleInputChangeQuantity } from "../../../utililties/helper/ProductHelper/handleInputChangeQuantity"
import { handleDecrementQuantity } from "../../../utililties/helper/ProductHelper/handleDecrementQuantity"
import { useCart } from "../../../utililties/customHook/useCart"
import { useAuth } from "../../../utililties/customHook/useAuth"


type QuantityTypeProps = {
    setQuantity: React.Dispatch<React.SetStateAction<Record<number, number>>>
    quantity: Record<number, number>,
    productVariant: ProductVariantsType,
    variant?: string
    forEditQuantity?: boolean;
}
export const Quantity = ({ setQuantity, quantity, productVariant, variant, forEditQuantity = false }: QuantityTypeProps) => {
    const { carts, refreshCartData } = useCart();
    const { isAuthenticated } = useAuth();
    const inputId = useId();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const valueQuantity = () => {

        const cart = carts?.find((item) => item.productVariant.id === productVariant.id);

        if (forEditQuantity === true) {
            if (cart) {
                return cart.quantity
            }
        } else {
            return quantity[productVariant.id] || 0
        }
    }

    return (
        <div className={`flex w-fit items-center justify-between flex-row  bg-barakaprimary-madder p-1 rounded-md text-white ${variant}`}>
            <Button type="button" variant={` transition-all duration-300`} onClick={() => handleDecrementQuantity({ id: productVariant.id, carts, isAuthenticated, forEditQuantity, refreshCartData, setQuantity, setIsLoading })}>
                <MinusCircle size={15} className="hover:scale-125 transition-all duration-300" />
            </Button>

            {isLoading ? (
                <div className="w-8 h-5 flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                <input type="number" name="quantity" id={`quantity-${inputId}`} className="w-8  md:max-w-10 border-none px-2 h-5 text-center text-xs form-input  bg-barakaprimary-madder  focus:ring-white"
                    // value={quantity[productVariant.id] || 0}
                    value={valueQuantity()}
                    onChange={(e) => handleInputChangeQuantity({ id: productVariant.id, carts, forEditQuantity, isAuthenticated, refreshCartData, setIsLoading, setQuantity, value: parseInt(e.target.value) })} />
            )}

            <Button type="button" variant=" transition-all duration-300" onClick={() => handleIncrementQuantity({ id: productVariant.id, carts, isAuthenticated, forEditQuantity, refreshCartData, setQuantity, setIsLoading })}>
                <PlusCircle size={15} className="hover:scale-125 transition-all duration-300" />
            </Button>
        </div>
    )
};