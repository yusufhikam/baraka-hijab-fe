
import Api from '../Auth/Api'

export type calculateCostType = {
    name: string
    code: string
    service: string
    description: string
    cost: number
    etd: string
}

type costType = {
    origin: string
    destination: string | undefined
    weight: number | undefined
    courier: string
}

export const cekOngkir = async ({
    origin,
    destination,
    weight,
    courier,
}: costType): Promise<calculateCostType[]> => {
    try {
        const res = await Api.post(`/rajaongkir/cost`, {
            origin,
            destination,
            weight,
            courier,
        })

        // console.log(res.data.data)
        return res.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}
