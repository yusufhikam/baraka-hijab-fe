import Api from '../Auth/Api'

type ProvincesType = {
    code: string
    name: string
}
export const getProvince = async (): Promise<ProvincesType[]> => {
    try {
        const res = await Api.get(`/rajaongkir/provinces`)

        return res.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}
