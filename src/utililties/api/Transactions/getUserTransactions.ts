import { userTransactionsType } from "../../../types/userTransactionsType";
import Api from "../Auth/Api";

const getUserTransactions = async (): Promise<userTransactionsType[]> => {
    try {
        const res = await Api.get('/user/transactions');

        return res.data.data
    } catch (error) {
        console.error(error);
        return []
    }
}

export default getUserTransactions