import axios from 'axios'
import { URLBase } from '../urlBase'

type KabupatenType = {
    code: string
    name: string
}

export const getKabupaten = async (
    code_province: string
): Promise<KabupatenType[]> => {
    try {
        const res = await axios.get(
            `${URLBase}/rajaongkir/kabupaten/${code_province}`
        )

        return res.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}
