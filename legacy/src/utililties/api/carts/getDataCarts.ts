import { CartType } from "../../../types/CartType";
import Api from "../Auth/Api";


const getDataCarts = async (isAuthenticated: boolean): Promise<CartType[]> => {

    if (isAuthenticated) {
        try {
            const res = await Api.get('/carts')
            // console.log(res.data.data)

            return res.data.data;

        } catch (error) {
            console.error(error);
            return []
        }
    } else {
        const cart = JSON.parse(localStorage.getItem('carts') || '[]');

        return cart;
    }
}


export default getDataCarts;