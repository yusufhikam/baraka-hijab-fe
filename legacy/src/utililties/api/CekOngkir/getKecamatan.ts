import Api from '../Auth/Api'

type KecamatanType = {
    code: string
    name: string
}

export const getKecamatans = async (
    code_kabupaten: string
): Promise<KecamatanType[]> => {
    try {
        const res = await Api.get(
            `/rajaongkir/kecamatan/${code_kabupaten}`
        )

        return res.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}
