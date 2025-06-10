import { } from "../../../types/AddressType";
import Api from "../Auth/Api";

type AddressTypePayload = {
    addressId: number;
    data: AddressTypePayload
}
const updateAddress = async ({ addressId, data }: AddressTypePayload): Promise<void> => {
    try {
        const res = await Api.patch(`/addresses/${addressId}`, data);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export default updateAddress;