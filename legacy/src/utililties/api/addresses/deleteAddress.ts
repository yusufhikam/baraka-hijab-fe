import Api from "../Auth/Api";

const deleteAddress = async (addressId: number): Promise<void | null> => {
    try {
        const res = await Api.delete(`/addresses/${addressId}`);
        return res.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export default deleteAddress;