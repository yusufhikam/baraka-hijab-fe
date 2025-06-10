import Api from "../Auth/Api";

const setPrimaryAddress = async (addressId: number) => {
    try {
        const res = await Api.patch(`/addresses/${addressId}/set-primary`);

        return res.data.data
    } catch (error) {
        console.error(error)
        return;
    }
}


export default setPrimaryAddress;