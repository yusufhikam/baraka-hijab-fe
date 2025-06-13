import { useForm } from 'react-hook-form'
import Select from '../../elements/FormElement/Select'
import { AddressTypePayload } from '../../../types/AddressType'
import { useEffect } from 'react'
import {
    useKabupatens,
    useKecamatans,
    useKelurahans,
    useProvinces,
} from '../../../utililties/customHook/useAddressOptions'
import Input from '../../elements/FormElement/Input'
import Button from '../../elements/Button/Button'
import TextArea from '../../elements/FormElement/TextArea'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../../../utililties/customHook/useAuth'
import { useUpdateAddress } from '../../../utililties/customHook/useAddressMutation'

type FormAddressProps = {
    onSubmit?: (data: AddressTypePayload) => void
    defaultValues?: AddressTypePayload | null
    isLoading?: boolean
    variant?: string
    formFor: 'add' | 'edit'
}
const FormAddress = ({
    onSubmit,
    defaultValues,
    isLoading,
    variant,
    formFor = 'add',
}: FormAddressProps) => {
    const { user } = useAuth()
    const { isLoadingUpdate } = useUpdateAddress()

    const {
        register,
        watch,
        reset,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues || {
            provinsi: '',
            kabupaten: '',
            kecamatan: '',
            kelurahan: '',
            postal_code: '',
            detail: '',
        },
    })

    // reset form saat defaultValues berubah (untuk form edit address)
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues)
        }
    }, [defaultValues, reset])

    const selectedCodeProvinsi = watch('provinsi')
    const selectedCodeKabupaten = watch('kabupaten')
    const selectedCodeKecamatan = watch('kecamatan')
    const selectedCodeKelurahan = watch('kelurahan')

    const { data: provinces = [], isLoading: isLoadingProvinces } =
        useProvinces()
    const { data: kabupatens = [], isLoading: isLoadingKabupaten } =
        useKabupatens(selectedCodeProvinsi)
    const { data: kecamatans = [], isLoading: isLoadingKecamatan } =
        useKecamatans(selectedCodeKabupaten)
    const { data: kelurahans = [], isLoading: isLoadingKelurahan } =
        useKelurahans(selectedCodeKecamatan)

    // set POSTAL CODE saat kelurahan sudah dipilih
    useEffect(() => {
        const findPostalCode = kelurahans.find(
            (kel) => kel.code === selectedCodeKelurahan
        )?.postal_code
        if (findPostalCode) {
            setValue('postal_code', findPostalCode)
        }
    }, [selectedCodeKelurahan, kelurahans, setValue])

    return (
        <form
            onSubmit={handleSubmit(onSubmit!)}
            className={`flex flex-col gap-5 ${variant}`}
        >
            <div className="">
                <Input
                    labelTitle="Name"
                    labelFor="name"
                    id="name"
                    readOnly
                    variantClass={`cursor-default ${user && 'ring ring-green-500 shadow-md shadow-green-500/50'}`}
                    value={user?.name}
                    autoComplete="off"
                />
                {user && (
                    <p className="mt-2 text-xs text-gray-400">
                        *To change your name go to Profile
                    </p>
                )}
            </div>
            <div className="">
                <Input
                    autoComplete="off"
                    labelTitle="Phone Number"
                    labelFor="phone"
                    id="phone"
                    readOnly
                    disabled
                    variantClass={`cursor-default ${user && 'ring ring-green-500 shadow-md shadow-green-500/50'}`}
                    value={
                        '+(62) ' +
                        (user?.phone_number
                            ?.toString()
                            .replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1-$2-$3') ||
                            '')
                    }
                />
                {user && (
                    <p className="mt-2 text-xs text-gray-400">
                        *To change your phone number go to Profile
                    </p>
                )}
            </div>
            <Select
                {...register('provinsi', { required: 'Provinsi is required' })}
                labelFor="provinsi"
                labelTitle="Provinsi"
                id="provinsi"
                onChange={(e) => {
                    e.preventDefault()
                    setValue('kabupaten', '')
                    setValue('kecamatan', '')
                    setValue('kelurahan', '')
                }}
                errorMessage={errors.provinsi?.message}
                variantClass={`w-full ${selectedCodeProvinsi && 'ring ring-green-500 shadow-md shadow-green-500/50'} ${isLoadingProvinces && 'animate-pulse shadow-red-500/20 shadow-xl ring-2 ring-red-500/60'}`}
            >
                <option value="">-- Select Provinsi --</option>
                {provinces.map((prov) => (
                    <option key={prov.code} value={prov.code}>
                        {prov.name}
                    </option>
                ))}
            </Select>
            <Select
                {...register('kabupaten', {
                    required: 'Kabupaten is required',
                })}
                labelFor="kabupaten"
                labelTitle="Kabupaten"
                id="kabupaten"
                errorMessage={errors.kabupaten?.message}
                variantClass={`w-full ${selectedCodeKabupaten && 'ring ring-green-500 shadow-md shadow-green-500/50'} ${isLoadingKabupaten && 'animate-pulse shadow-red-500/20 shadow-xl ring-2 ring-red-500/60'}`}
            >
                <option value="">-- Select Kabupaten --</option>
                {kabupatens.map((kab) => (
                    <option key={kab.code} value={kab.code}>
                        {kab.name}
                    </option>
                ))}
            </Select>
            <Select
                {...register('kecamatan', {
                    required: 'Kecamatan is required',
                })}
                labelFor="kecamatan"
                labelTitle="Kecamatan"
                id="kecamatan"
                errorMessage={errors.kecamatan?.message}
                variantClass={`w-full ${selectedCodeKecamatan && 'ring ring-green-500 shadow-md shadow-green-500/50'} ${isLoadingKecamatan && 'animate-pulse shadow-red-500/20 shadow-xl ring-2 ring-red-500/60'}`}
            >
                <option value="">-- Select Kecamatan --</option>
                {kecamatans.map((kec) => (
                    <option key={kec.code} value={kec.code}>
                        {kec.name}
                    </option>
                ))}
            </Select>
            <Select
                {...register('kelurahan', {
                    required: 'Kelurahan is required',
                })}
                labelFor="kelurahan"
                labelTitle="Kelurahan"
                id="kelurahan"
                errorMessage={errors.kelurahan?.message}
                variantClass={`w-full ${selectedCodeKelurahan && 'ring ring-green-500 shadow-md shadow-green-500/50'} ${isLoadingKelurahan && 'animate-pulse shadow-red-500/20 shadow-xl ring-2 ring-red-500/60'}`}
            >
                <option value="">-- Select Kelurahan --</option>
                {kelurahans.map((kel) => (
                    <option key={kel.code} value={kel.code}>
                        {kel.name}
                    </option>
                ))}
            </Select>
            <Input
                {...register('postal_code', {
                    required: 'Postal Code is required',
                })}
                labelTitle="Postal Code"
                labelFor="postal_code"
                id="postal_code"
                readOnly
                autoComplete="off"
                variantClass={`${watch('postal_code') && 'ring ring-green-500 shadow-md shadow-green-500/50'}`}
                errorMessage={errors.postal_code?.message}
            />

            <TextArea
                {...register('detail', {
                    required: 'Detail Address is required',
                })}
                labelTitle="Detail Address"
                labelFor="detail"
                id="detail"
                autoComplete="off"
                errorMessage={errors.detail?.message}
                rows={10}
                variantClass={`${watch('detail') && 'ring ring-green-500 shadow-md shadow-green-500/50'}`}
            ></TextArea>

            <Button
                type="submit"
                variant={`flex mt-5 gap-3 items-center justify-center bg-black px-4 py-2 font-poppins-bold hover:bg-barakaprimary-madder text-white rounded-md ${isLoading || (isLoadingUpdate && 'cursor-wait')}`}
                disabled={isLoading || isLoadingUpdate}
            >
                {isLoading || isLoadingUpdate ? (
                    <>
                        <Loader2 className="animate-spin" />
                        <span>
                            {formFor === 'edit' ? 'Updating' : 'Adding'}{' '}
                            Address...
                        </span>
                    </>
                ) : defaultValues ? (
                    'Update Address'
                ) : (
                    'Add Address'
                )}
            </Button>
        </form>
    )
}

export default FormAddress
