import { AddressType } from "../../../types/AddressType"
import Api from "../Auth/Api";


const getAddress = async (): Promise<AddressType[]> => {
    try {
        const res = await Api.get('/addresses');
        return res.data.data
    } catch (error) {
        console.error(error)
        return [];
    }
}


export default getAddress;