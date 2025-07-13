import { CheckoutType } from "../../../types/checkoutType";
import Api from "../Auth/Api";

export default async function postCheckout(data: CheckoutType) {
    try {
        const res = await Api.post('/checkout', data);

        console.log(res.data.data);
        return res.data.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}