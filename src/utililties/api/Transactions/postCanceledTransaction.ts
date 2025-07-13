import Api from "../Auth/Api";

const postCanceledTransaction = async (orderId: string) => {
    try {
        const res = await Api.post(`/user/transactions/cancel/${orderId}`);

        return res.data.data
    } catch (error) {
        console.error(error)
        return;
    }
}


export default postCanceledTransaction