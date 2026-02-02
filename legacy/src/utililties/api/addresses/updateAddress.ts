import { AddressTypePayload } from '../../../types/AddressType'
import Api from '../Auth/Api'

type updateAddressProps = {
    addressId: number | undefined
    data: AddressTypePayload
}
const updateAddress = async ({
    addressId,
    data,
}: updateAddressProps): Promise<AddressTypePayload> => {
    try {
        const res = await Api.patch(`/addresses/${addressId}`, data)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default updateAddress
