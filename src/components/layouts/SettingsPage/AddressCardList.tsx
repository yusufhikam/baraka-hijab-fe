import { memo, useCallback, useEffect, useState } from 'react'
import { AddressType } from '../../../types/AddressType'
import Card from '../../elements/Card/Card'
import { useAuth } from '../../../utililties/customHook/useAuth'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import {
    useAddressDetail,
    useSetPrimaryAddress,
} from '../../../utililties/customHook/useAddressMutation'
import { Check, CheckCircle2, Edit, Trash2 } from 'lucide-react'
import Button from '../../elements/Button/Button'
import ToastDeleteConfirmation from '../../elements/Alert/Toast/ToastDeleteConfirmation'
import useAddress from '../../../utililties/customHook/useAddress'
import Modal from '../../elements/Modal/Modal'
import FormAddress from './FormAddress'

type AddressCardListProps = {
    address: AddressType
}

const AddressCardList = memo(({ address }: AddressCardListProps) => {
    // console.count() //console render count
    const { user } = useAuth()
    const { isDarkMode } = useDarkMode()
    const { actions } = useAddress()
    const [openModalEdit, setOpenModalEdit] = useState<{
        isOpen: boolean
        addressId?: AddressType['id'] | null
    }>({
        isOpen: false,
        addressId: null,
    })

    // SET MAIN ADDRESS
    const { isPending, openMenuAction, setMainAddress, setOpenMenuAction } =
        useSetPrimaryAddress()

    const { refetch, refetchKabupaten, wilayahCode } = useAddressDetail(
        'edit',
        address.id
    )

    useEffect(() => {
        if (openModalEdit.isOpen && address?.id && wilayahCode.provinsi) {
            refetch()
            refetchKabupaten()
            console.log('refetching...')
        }
    }, [
        address.id,
        openModalEdit,
        refetch,
        refetchKabupaten,
        wilayahCode.provinsi,
    ])

    const handleDeleteAddress = useCallback(
        (addressId: number) => {
            ToastDeleteConfirmation({
                deleteFn: () => actions.onDelete(addressId),
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                confirmedButtonText: 'Yes, delete it!',
                deleteSuccessText: 'Address deleted successfully',
            })
        },
        [actions]
    )

    return (
        <Card
            onClick={() =>
                setOpenMenuAction({
                    isOpen: !openMenuAction.isOpen,
                    addressId: address.id,
                })
            }
            variant={`relative py-5 hover:cursor-pointer flex flex-col gap-3 w-full col-span-12 lg:col-span-6 h-full p-2  group rounded-md transition-all duration-300 
                    ${isPending && 'cursor-wait animate-pulse'}
                    ${
                        address.is_primary == true
                            ? `border-2 bg-green-500/25  border-emerald-500 hover:bg-green-500/50 shadow-md hover:shadow-green-500`
                            : `border-dashed ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-500 ' : 'hover:bg-zinc-300 bg-zinc-100'}`
                    } `}
        >
            <div className="flex-col gap-2 border-b text-sm">
                <h1>ID : {address.id}</h1>
                <h1>Name : {user?.name}</h1>
                <h1>Phone Number : {user?.phone_number}</h1>
                <h1>Email : {user?.email}</h1>
            </div>

            <div className="flex flex-col text-sm">
                <h1>
                    Provinsi :
                    <span className="font-bold"> {address.provinsi}</span>
                </h1>
                <h1>
                    Kabupaten :
                    <span className="font-bold"> {address.kabupaten}</span>
                </h1>
                <h1>
                    Kecamatan :
                    <span className="font-bold"> {address.kecamatan}</span>
                </h1>
                <h1>
                    Kelurahan :
                    <span className="font-bold"> {address.kelurahan}</span>
                </h1>
                <h1>
                    Postal Code :
                    <span className="font-bold"> {address.postal_code}</span>
                </h1>
            </div>

            <div className="flex flex-col text-sm">
                <h1 className="font-bold">Detail Address :</h1>
                <p className="line-clamp-2">{address.detail}</p>
            </div>

            {/* BUTTON ACTION */}
            <div
                className={`absolute top-1/2 right-1/2 flex translate-x-1/2 -translate-y-1/2 scale-0 justify-between gap-2 overflow-hidden rounded-full px-3 py-2 text-white transition-all duration-200 group-hover:shadow-lg ${
                    openMenuAction.isOpen &&
                    openMenuAction.addressId == address.id
                        ? 'scale-100 bg-black/20 opacity-100 backdrop-blur-lg'
                        : `scale-[0.5] opacity-0 group-hover:scale-125 group-hover:opacity-100 group-hover:shadow-black/40 group-hover:backdrop-blur-lg`
                }`}
            >
                <Button
                    type="button"
                    variant={`bg-red-500 rounded-full p-2   transition-all duration-300  ${openMenuAction ? 'scale-100 hover:scale-120' : 'scale-0 group-hover:scale-100 hover:scale-120'}`}
                    onClick={() => {
                        handleDeleteAddress(address.id)
                    }}
                >
                    <Trash2 />
                </Button>
                <Button
                    type="button"
                    variant={`bg-yellow-500 rounded-full p-2 text-black  transition-all duration-300  ${openMenuAction ? 'scale-100 hover:scale-120' : 'scale-0 group-hover:scale-100 hover:scale-120'}`}
                    onClick={() =>
                        setOpenModalEdit({
                            isOpen: true,
                            addressId: address.id,
                        })
                    }
                >
                    <Edit />
                </Button>
                <Button
                    type="button"
                    variant={`bg-sky-500 rounded-full p-2   transition-all duration-300 ${openMenuAction ? 'scale-100 hover:scale-120' : 'scale-0 group-hover:scale-100 hover:scale-120'}`}
                    onClick={() => setMainAddress(address.id)}
                >
                    <Check />
                </Button>
            </div>

            {/* DISPLAY MAIN ADDRESS CHECKLIST */}
            {address.is_primary == true && (
                <div className="absolute top-0 right-0 flex items-center gap-1 rounded-tr-sm rounded-bl-lg bg-green-300 p-1.5 text-xs text-emerald-700 transition-all duration-300 group-hover:rounded-bl-xl group-hover:bg-sky-500 group-hover:p-3 group-hover:text-white">
                    <CheckCircle2 size={25} />
                </div>
            )}

            {/* MODAL FORM EDIT */}
            {openModalEdit.isOpen === true &&
                openModalEdit.addressId === address.id && (
                    <Modal
                        isOpen={openModalEdit.isOpen}
                        onClose={() => setOpenModalEdit({ isOpen: false })}
                        animationType="scale"
                        variant={`w-1/2 h-[50vh] bg-white m-auto rounded-md p-5 shadow-2xl overflow-y-auto`}
                        key={address?.id}
                    >
                        <FormAddress formFor="edit" addressId={address?.id} />
                    </Modal>
                )}
        </Card>
    )
})

export default AddressCardList
