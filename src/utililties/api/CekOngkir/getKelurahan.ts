import axios from "axios";
import { URLBase } from "../urlBase";

type KelurahanType = {
    code: string
    name: string
    postal_code: string;
};

export const getKelurahan = async (code_kecamatan: string): Promise<KelurahanType[]> => {
    try {
        const res = await axios.get(`${URLBase}/rajaongkir/kelurahan/${code_kecamatan}`);

        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}