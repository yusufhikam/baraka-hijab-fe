import { CartType } from "../../../types/CartType";
import { handleUpdateQuantityType } from "../../../types/handleUpdateQuantityType";
import Api from "../../api/Auth/Api";



export const handleIncrementQuantity = async ({ id, carts, isAuthenticated, forEditQuantity, refreshCartData, setQuantity, setIsLoading }: handleUpdateQuantityType) => {

    if (forEditQuantity) {
        if (isAuthenticated) {
            // TODO: Kirim API PATCH ke SERVER

            const cart = carts?.find((item) => item.productVariant.id === id);
            const currentQuantity = cart?.quantity ?? 1;

            try {
                setIsLoading(true);

                await Api.patch(`/carts/${id}`, {
                    quantity: currentQuantity + 1,
                });

                refreshCartData();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }

        } else {
            // update data localstorage
            setIsLoading(true);
            const storedCart = JSON.parse(localStorage.getItem('carts') || '[]');
            const updatedCart = storedCart.map((item: CartType) => {
                if (item.productVariant.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
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
            [id]: (prev[id] || 0) + 1,
        }));
    }
};