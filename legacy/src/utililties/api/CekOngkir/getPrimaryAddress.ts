import { AddressType } from '../../../types/AddressType'
import Api from '../Auth/Api'

export default async function getPrimaryAddress(): Promise<AddressType> {
    try {
        const res = await Api.get('/addresses/user/primary-address')
        // console.log(res.data)
        return res.data.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
