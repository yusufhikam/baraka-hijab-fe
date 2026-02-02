import { AddressTypePayload } from "../../../types/AddressType";
import Api from "../Auth/Api";

const createAddress = async (data: AddressTypePayload): Promise<AddressTypePayload> => {
    try {
        const res = await Api.post('/addresses', data);
        return res.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export default createAddress;