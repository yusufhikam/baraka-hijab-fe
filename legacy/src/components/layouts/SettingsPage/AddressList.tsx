import { memo } from 'react'
import Card from '../../elements/Card/Card'
import { useAuth } from '../../../utililties/customHook/useAuth'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import { AddressType, AddressTypePayload } from '../../../types/AddressType'
import { useSetPrimaryAddress } from '../../../utililties/customHook/useAddressMutation'
import Button from '../../elements/Button/Button'
import { Check, CheckCircle2, Edit, Trash2 } from 'lucide-react'
import Modal from '../../elements/Modal/Modal'
import H1 from '../../elements/Title Header/H1'
import FormAddress from './FormAddress'
import usePrimaryAddress from '../../../utililties/customHook/usePrimaryAddress'

type AddressListProps = {
    address: AddressType
    selectedEdit: {
        isOpen: boolean
        address: AddressType | undefined
    }
    setSelectedEdit: React.Dispatch<
        React.SetStateAction<{
            isOpen: boolean
            address: AddressType | undefined
        }>
    >
    onUpdate: (data: AddressTypePayload) => void
    onDelete: (addressId: number) => void
}

const AddressList = memo(
    ({
        address,
        selectedEdit,
        setSelectedEdit,
        onUpdate,
        onDelete,
    }: AddressListProps) => {
        const { user } = useAuth()
        const { isDarkMode } = useDarkMode()
        const { primaryAddress } = usePrimaryAddress()

        // SET MAIN ADDRESS
        const { isPending, openMenuAction, setMainAddress, setOpenMenuAction } =
            useSetPrimaryAddress()

        return (
            <Card
                onClick={() =>
                    setOpenMenuAction({
                        isOpen: !openMenuAction.isOpen,
                        addressId: address.id,
                    })
                }
                variant={`relative py-2 hover:cursor-pointer flex flex-col gap-3 w-full col-span-12 lg:col-span-6 h-full p-2  group rounded-md transition-all duration-300 
                    ${isPending && 'cursor-wait animate-pulse'}
                    ${
                        address.is_primary == true
                            ? `border-2 bg-green-500/25  border-emerald-500 hover:bg-green-500/50 shadow-md hover:shadow-green-500`
                            : `border-dashed ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-500 ' : 'hover:bg-zinc-300 bg-zinc-100'}`
                    } `}
            >
                <div className="flex-col gap-2 border-b text-sm">
                    <h1>Name : {user?.name}</h1>
                    <h1>Phone Number : (+62) {user?.phone_number}</h1>
                    <h1>Email : {user?.email}</h1>
                </div>

                <div className="flex flex-col text-sm">
                    <h1>
                        Provinsi :
                        <span className="font-bold">
                            {' '}
                            {address.provinsi_name}
                        </span>
                    </h1>
                    <h1>
                        Kabupaten :
                        <span className="font-bold">
                            {' '}
                            {address.kabupaten_name}
                        </span>
                    </h1>
                    <h1>
                        Kecamatan :
                        <span className="font-bold">
                            {' '}
                            {address.kecamatan_name}
                        </span>
                    </h1>
                    <h1>
                        Kelurahan :
                        <span className="font-bold">
                            {' '}
                            {address.kelurahan_name}
                        </span>
                    </h1>
                    <h1>
                        Postal Code :
                        <span className="font-bold">
                            {' '}
                            {address.postal_code}
                        </span>
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
                            ? 'scale-100 bg-white/40 opacity-100 backdrop-blur-lg'
                            : `scale-[0.5] opacity-0 group-hover:scale-125 group-hover:bg-white/20 group-hover:opacity-100 group-hover:shadow-black/40 group-hover:backdrop-blur-lg`
                    }`}
                >
                    <Button
                        type="button"
                        variant={`bg-red-500 rounded-full p-2 hover:shadow-md hover:shadow-black/30  transition-all duration-300  ${openMenuAction ? 'scale-100 hover:scale-120' : 'scale-0 group-hover:scale-100 hover:scale-120'}`}
                        onClick={() => {
                            onDelete(address.id!)
                        }}
                    >
                        <Trash2 />
                    </Button>
                    <Button
                        type="button"
                        variant={`bg-yellow-500 rounded-full p-2 text-black hover:shadow-md hover:shadow-black/30 transition-all duration-300  ${openMenuAction ? 'scale-100 hover:scale-120' : 'scale-0 group-hover:scale-100 hover:scale-120'}`}
                        onClick={() =>
                            setSelectedEdit({ isOpen: true, address })
                        }
                    >
                        <Edit />
                    </Button>

                    {/* hide check button or set primary address button if address is primary */}
                    {primaryAddress?.id != address.id && (
                        <Button
                            type="button"
                            variant={`bg-sky-500 rounded-full p-2 hover:shadow-md hover:shadow-black/30  transition-all duration-300 ${openMenuAction ? 'scale-100 hover:scale-120' : 'scale-0 group-hover:scale-100 hover:scale-120'}`}
                            onClick={() => setMainAddress(address.id!)}
                        >
                            <Check />
                        </Button>
                    )}
                </div>

                {/* DISPLAY MAIN ADDRESS CHECKLIST */}
                {address.is_primary == true && (
                    <div className="absolute top-0 right-0 flex items-center gap-1 rounded-tr-sm rounded-bl-lg bg-green-300 p-1.5 text-xs text-emerald-700 transition-all duration-300 group-hover:rounded-bl-xl group-hover:bg-sky-500 group-hover:p-3 group-hover:text-white">
                        <CheckCircle2 size={25} />
                    </div>
                )}

                {selectedEdit.isOpen === true &&
                    selectedEdit.address?.id === address.id && (
                        <Modal
                            isOpen={selectedEdit.isOpen}
                            onClose={() =>
                                setSelectedEdit({
                                    isOpen: false,
                                    address: undefined,
                                })
                            }
                            animationType="scale"
                            variant={` rounded-md  w-[60%] h-[80vh] m-auto overflow-y-scroll shadow-2xl scrollbar-hide ${isDarkMode ? 'bg-zinc-700 shadow-white/25' : 'bg-white shadow-black/50'}`}
                        >
                            <div
                                className={`sticky top-0 border-b py-5 text-center shadow-md ${isDarkMode ? 'border-b-white/20 bg-zinc-500' : 'border-b-black/20 bg-zinc-100'}`}
                            >
                                <H1>Update an address</H1>
                            </div>
                            <FormAddress
                                defaultValues={selectedEdit.address}
                                onSubmit={onUpdate}
                                variant={`pt-5 pb-2 px-10`}
                                formFor="edit"
                            />

                            <div className="px-10 pb-5">
                                <Button
                                    type="button"
                                    variant="border-2 border-barakaprimary-madder transition-all text-lg duration-300 text-barakaprimary-madder hover:text-white hover:bg-barakaprimary-madder py-1 font-poppins-bold text-lg w-full px-4 rounded-md"
                                    onClick={() =>
                                        setSelectedEdit({
                                            isOpen: false,
                                            address: undefined,
                                        })
                                    }
                                >
                                    CLOSE
                                </Button>
                            </div>
                        </Modal>
                    )}
            </Card>
        )
    }
)

export default AddressList
