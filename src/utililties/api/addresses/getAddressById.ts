import { AddressType } from "../../../types/AddressType";
import Api from "../Auth/Api";


const getAddressById = async (id: AddressType['id']): Promise<AddressType | null> => {
    try {
        const res = await Api.get(`/address/${id}`)
        return res.data.data
    } catch (error) {
        console.error(error)
        return null;
    }
}

export default getAddressById