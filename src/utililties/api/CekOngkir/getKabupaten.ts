
import Api from '../Auth/Api'

type KabupatenType = {
    code: string
    name: string
}

export const getKabupaten = async (
    code_province: string
): Promise<KabupatenType[]> => {
    try {
        const res = await Api.get(
            `/rajaongkir/kabupaten/${code_province}`
        )

        return res.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}
