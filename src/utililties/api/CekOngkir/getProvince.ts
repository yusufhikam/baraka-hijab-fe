import axios from "axios";
import { URLBase } from "../urlBase";

type ProvincesType = {
    code: string;
    name: string;
}
export const getProvince = async (): Promise<ProvincesType[]> => {
    try {
        const res = await axios.get((`${URLBase}/rajaongkir/provinces`));

        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}