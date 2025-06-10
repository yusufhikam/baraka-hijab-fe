import axios from "axios";
import { URLBase } from "../urlBase";

// const apiNow = axios.create({
//     headers: {
//         "x-api-key": "uXQ6KFzlde054d11bcdbede1oBxRxHGC"
//     }
// })

export const SearchDestination = async (value: string) => {
    try {
        const res = await axios.get(`${URLBase}/rajaongkir/destinations`, {
            headers: {
                'key': 'uXQ6KFzlde054d11bcdbede1oBxRxHGC'
            },
            params: {
                search: value
            }
        });

        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
        // throw error;
    }
}