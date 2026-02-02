
import Api from '../Auth/Api'

type KelurahanType = {
    code: string
    name: string
    postal_code: string
}

export const getKelurahan = async (
    code_kecamatan: string
): Promise<KelurahanType[]> => {
    try {
        const res = await Api.get(
            `/rajaongkir/kelurahan/${code_kecamatan}`
        )

        return res.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}
