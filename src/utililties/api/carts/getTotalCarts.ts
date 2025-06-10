import Api from "../Auth/Api";

const getTotalCarts = async (isAuthenticated:boolean): Promise<number> => {
    if (isAuthenticated) {
        try {
            const res = await Api.get('/carts');
            // console.log(res.data.data.length)
            return res.data.data.length;

        } catch (error) {
            console.error(error);
            return 0;
        }
    } else {
        const cart = JSON.parse(localStorage.getItem('carts') || '[]');
        return cart.length;
    }
};


export default getTotalCarts;