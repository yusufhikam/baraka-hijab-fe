import { Loader2 } from 'lucide-react'
import Button from '../../elements/Button/Button'
import H1 from '../../elements/Title Header/H1'
import PrimaryAddressCard from './PrimaryAddressCard'
import Select from '../../elements/FormElement/Select'
import CourierCardList from './CourierCardList'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import { useQuery } from '@tanstack/react-query'
import getPrimaryAddress from '../../../utililties/api/CekOngkir/getPrimaryAddress'
import { useForm } from 'react-hook-form'
import { useCalculateShipping } from '../../../utililties/customHook/useAddressMutation'
import { useCallback } from 'react'
import { useWilayahName } from '../../../utililties/customHook/useAddressOptions'
import { calculateCostType } from '../../../utililties/api/CekOngkir/cekOngkir'
import { Link } from 'react-router-dom'

type shippingDetailsProps = {
    selectedCourier: calculateCostType | null
    setSelectedCourier: React.Dispatch<
        React.SetStateAction<calculateCostType | null>
    >
}
const ShippingDetails = ({
    selectedCourier,
    setSelectedCourier,
}: shippingDetailsProps) => {
    const { isDarkMode } = useDarkMode()

    const { data: primaryAddress, isLoading: isLoadingAddress } = useQuery({
        queryKey: ['primaryaddress'],
        queryFn: () => getPrimaryAddress(),
        staleTime: 1000 * 60 * 5,
    })
    // wilayah name
    const { wilayahName } = useWilayahName(primaryAddress)

    // for form calculate shipping
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            courier: '',
        },
    })

    // mutate calculate shipping
    const {
        mutate,
        isPending: isCalculating,
        courierShipping,
    } = useCalculateShipping({
        address: primaryAddress,
        courier: watch('courier'),
    })

    // onSubmit mutation calculate shipping
    const onSubmit = useCallback(() => {
        mutate()
    }, [mutate])

    // courier Logo
    const courierLogo = courierShipping?.find(
        (courier) => courier.code === 'jne'
    )
        ? 'jne_logo.png'
        : 'pos_logo.png'

    return (
        <>
            <H1>Shipping Details</H1>

            <div className="mb-2 flex w-full justify-end">
                <Link
                    to={'/auth/settings'}
                    className={`hover:bg-barakaprimary-madder rounded-md bg-black px-2 py-1 text-xs text-white`}
                >
                    Change address
                </Link>
            </div>

            {/* DISPLAY PRIMARY ADDRESS */}
            <div
                className={`mb-5 flex flex-col rounded-md border-2 border-dashed px-1.5 py-2 ${isDarkMode ? 'border-white/25' : 'border-black/25'} ${isLoadingAddress && 'h-56 animate-pulse bg-zinc-100'}`}
            >
                {isLoadingAddress ? (
                    <Loader2
                        size={40}
                        className="text-barakaprimary-madder m-auto animate-spin"
                    />
                ) : (
                    // PRIMARY ADDRESS CARD
                    <PrimaryAddressCard
                        primaryAddress={primaryAddress}
                        wilayahName={wilayahName}
                    />
                )}
            </div>

            {/* DISPLAY COURIER LIST */}

            <div
                className={`mb-10 rounded-md px-3 py-5 shadow-xl shadow-black/25 ${isDarkMode ? 'bg-zinc-600' : 'bg-white'}`}
            >
                <H1 fontSize="text-xl">Calculate Shipping</H1>
                <hr className="my-3" />
                <div className="flex flex-col items-center gap-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full flex-col gap-5"
                    >
                        <Select
                            labelFor="courier"
                            labelTitle="Courier"
                            id="courier"
                            {...register('courier', {
                                required: 'Please select a courier',
                            })}
                            variantClass={` ${watch('courier') && 'ring-2 border-green-500 ring-green-300 shadow-lg shadow-green-500/40'}`}
                        >
                            <option value="">-- Select Courier --</option>
                            <option value="jne">JNE</option>
                            <option value="pos">POS Indonesia</option>
                        </Select>

                        {errors.courier && (
                            <p className="w-full rounded-md border border-red-500 bg-red-500/20 px-2 text-center text-red-500">
                                {errors.courier?.message}
                            </p>
                        )}

                        <Button
                            type="submit"
                            variant={` flex items-center justify-center gap-2 text-white w-full py-2 rounded-md font-bold tracking-widest 
                                        ${isDarkMode ? 'bg-barakaprimary-madder hover:bg-barakaprimary-snow hover:text-barakaprimary-madder' : 'bg-black hover:bg-barakaprimary-madder '}
                                        ${isCalculating && 'cursor-wait '}`}
                            disabled={isCalculating}
                        >
                            {isCalculating ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    CHECKING COURIER...
                                </>
                            ) : (
                                'CHECK COURIER'
                            )}
                        </Button>
                    </form>

                    <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-5">
                        {courierShipping &&
                            [...courierShipping] // mengubah array asli, jadi untuk menjaga immutability (tidak ubah state langsung), kita buat salinan array-nya dulu
                                .sort((a, b) => a.cost - b.cost) // for sorting ASC by LOWEST COST SHIPPING
                                .map((courier, index) => {
                                    return (
                                        <CourierCardList
                                            key={index}
                                            courier={courier}
                                            courierLogo={courierLogo}
                                            isSelected={
                                                selectedCourier?.service ===
                                                courier.service
                                            }
                                            onSelect={() => {
                                                setSelectedCourier(courier)
                                            }}
                                        />
                                    )
                                })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingDetails
