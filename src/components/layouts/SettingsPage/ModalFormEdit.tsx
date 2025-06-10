import { memo, useEffect } from 'react'
import Modal from '../../elements/Modal/Modal'
import { AddressType } from '../../../types/AddressType'
import { useAuth } from '../../../utililties/customHook/useAuth'
// import useWilayahQuery from '../../../utililties/customHook/useWilayahQuery'
// import { useQuery } from '@tanstack/react-query'
// import { getProvince } from '../../../utililties/api/CekOngkir/getProvince'
// import {
//     useAddressDetail,
//     useUpdateAddress,
// } from '../../../utililties/customHook/useAddressMutation'
import FormAddress from './FormAddress'
import { useAddressDetail } from '../../../utililties/customHook/useAddressMutation'

type ModalFormEditProps = {
    openModalEdit: {
        isOpen: boolean
        addressId?: number | null
    }
    setOpenModalEdit: React.Dispatch<
        React.SetStateAction<{
            isOpen: boolean
            addressId?: number | null
        }>
    >
    address: AddressType | undefined
}

const ModalFormEdit = memo(
    ({ openModalEdit, setOpenModalEdit, address }: ModalFormEditProps) => {
        const { user } = useAuth()
        // const { provinces, getProvinceCode } = useUpdateAddress()
        // const { data: addressDetail, isSuccess } = useAddressDetail(
        //     openModalEdit.addressId!
        // )

        const { refetch } = useAddressDetail('edit', openModalEdit.addressId!)

        useEffect(() => {
            if (openModalEdit.isOpen && address?.id) {
                refetch()
            }
        }, [openModalEdit, address, refetch])

        return (
            openModalEdit &&
            openModalEdit.isOpen &&
            openModalEdit.addressId && (
                <Modal
                    isOpen={openModalEdit.isOpen}
                    onClose={() => setOpenModalEdit({ isOpen: false })}
                    animationType="scale"
                    variant={`w-1/2 h-[50vh] bg-white m-auto rounded-md p-5 shadow-2xl overflow-y-auto`}
                    key={address?.id}
                >
                    <FormAddress formFor="edit" addressId={address?.id} />
                </Modal>
            )
        )
    }
)

export default ModalFormEdit
