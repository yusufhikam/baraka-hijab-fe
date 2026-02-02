import { CartType } from "../../../types/CartType";
import { handleUpdateQuantityType } from "../../../types/handleUpdateQuantityType";
import Api from "../../api/Auth/Api";



export const handleDecrementQuantity = async ({ id, carts, isAuthenticated, forEditQuantity, refreshCartData, setQuantity, setIsLoading }: handleUpdateQuantityType) => {

    if (forEditQuantity) { // decrement quantity for cart
        if (isAuthenticated) {
            // TODO: Kirim API PATCH ke SERVER

            const cart = carts?.find((item) => item.productVariant.id === id);
            const currentQuantity = cart?.quantity ?? 1;

            if (currentQuantity === 1) return

            try {
                setIsLoading(true);

                await Api.patch(`/carts/${id}`, {
                    quantity: currentQuantity - 1
                });

                refreshCartData();
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }

        } else {
            // update data localstorage ketika belum login
            setIsLoading(true);
            const storedCart = JSON.parse(localStorage.getItem('carts') || '[]');

            const updatedCart = storedCart.map((item: CartType) => {
                if (item.productVariant.id === id) {
                    return { ...item, quantity: Math.max(item.quantity - 1, 1) } // memastikan quantity tidak kurang dari 0
                }

                return item;
            });

            localStorage.setItem('carts', JSON.stringify(updatedCart));
            refreshCartData();
            setIsLoading(false);
        }
    } else {

        // for decrement quantity for add to cart
        setQuantity((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 0), // memastikan quantity tidak kurang dari 0
        }));
    }
}