import Breadcrumb from '../../fragments/Breadcrumb/Breadcrumb'
import { Loader, Plus } from 'lucide-react'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import Button from '../../elements/Button/Button'
import { useState } from 'react'
import H1 from '../../elements/Title Header/H1'
import FormAddress from './FormAddress'
import Modal from '../../elements/Modal/Modal'
import { useGetAddress } from '../../../utililties/customHook/useAddressMutation'
import AddressCardList from './AddressCardList'
import FormAddress2 from '../../fragments/SettingsPage/FormAddress2'

const AddressLayout = () => {
    const { isDarkMode } = useDarkMode()
    const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)

    // GET DATA ADDRESS
    const { addresses, isLoadingAddresses } = useGetAddress()

    return (
        <div className="p-5">
            <div className="flex justify-center">
                <Breadcrumb
                    links_breadcrumb={[
                        {
                            label: 'HOME',
                            link: '/',
                            isActive: false,
                            isAllowed: true,
                        },
                        {
                            label: 'ADRESS',
                            link: '#',
                            isActive: true,
                            isAllowed: true,
                        },
                    ]}
                />
            </div>

            <div className="mt-10 flex flex-col flex-wrap justify-center gap-5 md:flex-row md:gap-2">
                {/* LEFT SECTION */}

                <div
                    className={`form hidden h-1/2 rounded-md p-5 shadow-md md:block md:w-[35%] lg:w-[28%] ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`}
                >
                    <H1>Add an address</H1>
                    {/* <FormAddress formFor="add" variantClass="mt-5" /> */}
                    <FormAddress2 />
                </div>
                {/* END LEFT SECTION */}

                {/* RIGHT SECTION */}
                <div
                    className={`address-list relative flex h-fit flex-col md:w-[60%] lg:w-[70%] ${isDarkMode ? 'bg-zinc-700' : 'bg-white'} rounded-md p-5 shadow-md`}
                >
                    <div className="absolute top-2 right-2 md:hidden">
                        <Button
                            variant={`bg-barakaprimary-dessert text-zinc-800 hover:text-white hover:bg-barakaprimary-madder p-4 rounded-md text-lg transition-all duration-300 font-poppins-semibold`}
                            type="button"
                            title="Add Address"
                            onClick={() => {
                                setOpenModalAdd(true)
                                console.log('open modal')
                            }} // open modal ADD ADDRESS
                        >
                            <Plus size={20} strokeWidth={5} />
                        </Button>
                    </div>

                    <h1 className="mb-5 text-2xl font-bold md:mb-0">
                        Your Addresses
                    </h1>

                    <div className="mt-5 grid grid-cols-12 gap-5">
                        {isLoadingAddresses ? (
                            <Loader
                                size={40}
                                className="mx-auto animate-spin"
                            />
                        ) : (
                            addresses &&
                            addresses.map((address, index) => (
                                <AddressCardList
                                    address={address}
                                    key={index}
                                />
                            ))
                        )}
                    </div>
                </div>
                {/* END RIGHT SECTION */}
            </div>

            {/* MODAL FORM ADD */}

            <Modal
                animationType="scale"
                isOpen={openModalAdd}
                onClose={() => setOpenModalAdd(false)}
                variant={` rounded-md  w-[80%] h-[80vh] m-auto overflow-y-scroll shadow-2xl scrollbar-hide ${isDarkMode ? 'bg-zinc-700 shadow-white/25' : 'bg-white shadow-black/50'}`}
            >
                <div className="sticky top-0 border-b border-b-black/20 bg-zinc-100 py-5 text-center shadow-md">
                    <H1>Add an address</H1>
                </div>
                <FormAddress formFor="add" variantClass={`pt-5 pb-2 px-10`} />
                <div className="px-10 pb-5">
                    <Button
                        type="button"
                        variant="border-2 border-barakaprimary-madder transition-all duration-300 text-barakaprimary-madder hover:text-white hover:bg-barakaprimary-madder py-1 font-poppins-bold text-lg w-full px-4 rounded-md"
                        onClick={() => setOpenModalAdd(false)}
                    >
                        CLOSE
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default AddressLayout
