import { CartType } from "../../../types/CartType";
import { handleUpdateQuantityType } from "../../../types/handleUpdateQuantityType";
import Api from "../../api/Auth/Api";

export const handleInputChangeQuantity = async ({ id, value, isAuthenticated, forEditQuantity, refreshCartData, setQuantity, setIsLoading }: handleUpdateQuantityType) => {

    if (forEditQuantity) {
        if (isAuthenticated) {
            // TODO: Kirim API PATCH ke SERVER


            try {
                setIsLoading(true);
                await Api.patch(`/carts/${id}`, {
                    quantity: (value ?? 1) > 0 ? (value ?? 1) : 1, // memastikan quantity tidak kurang dari 0 dan value tidak undefined
                });

                refreshCartData();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }

        } else {
            // update data localstorage ketika belum login
            setIsLoading(true);
            const storedCart = JSON.parse(localStorage.getItem('carts') || '[]');

            const updatedCart = storedCart.map((item: CartType) => {
                if (item.productVariant.id === id) {
                    return {
                        ...item,
                        quantity: (value ?? 1) > 0 ? (value ?? 1) : 1, // memastikan quantity tidak kurang dari 0 dan value tidak undefined
                    }
                }

                return item;
            });

            localStorage.setItem('carts', JSON.stringify(updatedCart));
            refreshCartData();
            setIsLoading(false);
        }
    } else {
        // untuk handle Add to Cart
        setQuantity((prev) => ({
            ...prev,
            [id]: ((value ?? 1) > 0 ? (value ?? 1) : 1), // memastikan quantity tidak kurang dari 0 dan value tidak undefined
        }));
    }
}