import axios from 'axios'
import { URLBase } from '../urlBase'

type KecamatanType = {
    code: string
    name: string
}

export const getKecamatans = async (
    code_kabupaten: string
): Promise<KecamatanType[]> => {
    try {
        const res = await axios.get(
            `${URLBase}/rajaongkir/kecamatan/${code_kabupaten}`
        )

        return res.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}
