
import Api from "../Auth/Api";

const syncCartsFromLocalStorage = async () => {
    const localCart = JSON.parse(localStorage.getItem('carts') || '[]');

    if (localCart.length === 0) return;

    try {
        await Api.post(`/carts/sync`, {
            data: localCart // input carts
        });

        localStorage.removeItem('carts');

    } catch (error) {
        console.error(error);
    }
}


export default syncCartsFromLocalStorage;