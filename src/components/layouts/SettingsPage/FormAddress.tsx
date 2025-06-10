import Select from '../../elements/FormElement/Select'
import Input from '../../elements/FormElement/Input'
import { useAuth } from '../../../utililties/customHook/useAuth'
import Button from '../../elements/Button/Button'
import TextArea from '../../elements/FormElement/TextArea'
import useAddress from '../../../utililties/customHook/useAddress'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import {
    useAddressDetail,
    // useUpdateAddress,
} from '../../../utililties/customHook/useAddressMutation'

type FormAddAddressProps = {
    formFor: 'add' | 'edit'
    variantClass?: string
    addressId?: number
}
const FormAddress = ({
    formFor,
    variantClass,
    addressId,
}: FormAddAddressProps) => {
    const { user } = useAuth()
    const { form, wilayah, actions } = useAddress()
    const { addressData, isSuccess, isLoadingData, wilayahCode } =
        useAddressDetail('edit', addressId!)
    const { reset, setValue } = form
    // START SET POSTAL CODE because the postal_code is manualy set the value in input, so we need to set it with useEffect
    const selectedKelurahanCode = form.selectedCode.Kelurahan
    const setPostalCode = form.setValue

    useEffect(() => {
        const kelurahan = wilayah.kelurahans?.find(
            (kel) => kel.code === selectedKelurahanCode
        )

        if (kelurahan?.postal_code) {
            setPostalCode('postal_code', kelurahan.postal_code)
        }
    }, [selectedKelurahanCode, wilayah.kelurahans, setPostalCode])
    // END SET POSTAL CODE

    // useEffect if formFor === 'edit
    useEffect(() => {
        if (formFor === 'edit' && addressData && isSuccess) {
            setValue('provinsi', wilayahCode.provinsi)
            setValue('kabupaten', wilayahCode.kabupaten)
            setValue('kecamatan', wilayahCode.kecamatan!)
            setValue('kelurahan', wilayahCode.kelurahan!)
            setValue('postal_code', addressData.postal_code)
            setValue('detail', addressData.detail)
            // setValue({
            //     provinsi: wilayahCode.provinsi,
            //     kabupaten: wilayahCode.kabupaten,
            //     kecamatan: wilayahCode.kecamatan,
            //     kelurahan: wilayahCode.kelurahan,
            //     postal_code: addressData.postal_code,
            //     detail: addressData.detail,
            // })
        }
    }, [
        formFor,
        addressData,
        isSuccess,
        setValue,
        wilayahCode.kabupaten,
        wilayahCode.kecamatan,
        wilayahCode.kelurahan,
        wilayahCode.provinsi,
    ])
    const handleOnSubmit = () => {
        if (formFor === 'add') {
            actions.onSubmit(form.payload, {
                onSuccess: () => {
                    reset()
                },
            })
        } else {
            //for edit
        }
    }

    return formFor === 'edit' && isLoadingData ? (
        <div className="flex h-full w-full items-center justify-center">
            <Loader2 size={40} className="m-auto animate-spin" />
        </div>
    ) : (
        <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className={`flex flex-col gap-5 ${variantClass}`}
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
            {/* PROVINCE */}
            <Select
                {...form.register('provinsi', {
                    required: 'Province is required',
                })}
                errorMessage={form.errors.provinsi?.message}
                labelTitle="Province"
                id="provinsi"
                labelFor="provinsi"
                onChange={(e) => {
                    const provCode = e.target.value
                    form.setValue('provinsi', provCode)
                    form.resetField('kabupaten')
                    form.resetField('kecamatan')
                    form.resetField('kelurahan')
                    form.resetField('postal_code')
                }}
                variantClass={`w-full ${form.selectedCode.Province && 'ring ring-green-500 shadow-md shadow-green-500/50'} ${wilayah.dataLoading.isLoadingProvinces && 'animate-pulse shadow-red-500/20 shadow-xl ring-2 ring-red-500/60'}`}
            >
                <option value="" disabled>
                    -- Select Province --
                </option>
                {wilayah.provinces &&
                    wilayah.provinces.map((province, index) => (
                        <option value={province.code} key={index}>
                            {province.name}
                        </option>
                    ))}
            </Select>
            {/* KABUPATEN */}
            <Select
                {...form.register('kabupaten', {
                    required: 'Kabupaten is required',
                })}
                errorMessage={form.errors.kabupaten?.message}
                labelTitle="Kabupaten"
                id="kabupaten"
                labelFor="kabupaten"
                variantClass={`w-full ${form.selectedCode.Kabupaten && 'ring ring-green-500 shadow-md shadow-green-500/50'} ${wilayah.dataLoading.isLoadingKabupaten && 'animate-pulse shadow-red-500/20 shadow-xl ring-2 ring-red-500/60'}`}
            >
                <option value="" disabled>
                    -- Select Kabupaten --
                </option>
                {wilayah.kabupatens &&
                    wilayah.kabupatens.map((kabupaten, index) => (
                        <option value={kabupaten.code} key={index}>
                            {kabupaten.name}
                        </option>
                    ))}
            </Select>
            {/* KECAMATAN */}
            <Select
                {...form.register('kecamatan', {
                    required: 'Kecamatan is required',
                })}
                errorMessage={form.errors.kecamatan?.message}
                labelTitle="Kecamatan"
                id="kecamatan"
                labelFor="kecamatan"
                variantClass={`${form.selectedCode.Kecamatan && 'ring ring-green-500 shadow-md shadow-green-500/50'} ${wilayah.dataLoading.isLoadingKecamatan && 'animate-pulse shadow-red-500/20 shadow-xl ring-2 ring-red-500/60'}`}
            >
                <option value="" disabled>
                    -- Select Kecamatan --
                </option>
                {form.selectedCode.Province &&
                    wilayah.kecamatans &&
                    wilayah.kecamatans.map((kecamatan, index) => (
                        <option value={kecamatan.code} key={index}>
                            {kecamatan.name}
                        </option>
                    ))}
            </Select>
            {/* KELURAHAN */}
            <Select
                {...form.register('kelurahan', {
                    required: 'Kelurahan is required',
                })}
                errorMessage={form.errors.kelurahan?.message}
                labelTitle="Kelurahan"
                id="kelurahan"
                labelFor="kelurahan"
                variantClass={`${form.selectedCode.Kelurahan && 'ring ring-green-500 shadow-md shadow-green-500/50'} ${wilayah.dataLoading.isLoadingKelurahan && 'animate-pulse shadow-red-500/20 shadow-xl ring-2 ring-red-500/60'}`}
            >
                <option value="" disabled>
                    -- Select Kelurahan --
                </option>
                {wilayah.kelurahans &&
                    wilayah.kelurahans.map((kelurahan, index) => (
                        <option value={kelurahan.code} key={index}>
                            {kelurahan.name}
                        </option>
                    ))}
            </Select>
            {/* POSTAL CODE */}
            <Input
                {...form.register('postal_code', {
                    required: 'Postal Code is required',
                })}
                errorMessage={form.errors.postal_code?.message}
                labelTitle="Postal Code"
                labelFor="postal_code"
                readOnly
                id="postal_code"
                autoComplete="off"
                variantClass={`cursor-default ${form.selectedCode.Kelurahan && 'ring ring-green-500 shadow-md shadow-green-500/50'}`}
                value={
                    (form.selectedCode.Kelurahan &&
                        wilayah.kelurahans?.find(
                            (kelurahan) =>
                                kelurahan.code === form.selectedCode.Kelurahan
                        )?.postal_code) ||
                    ''
                }
            />

            <TextArea
                {...form.register('detail', {
                    required: 'Detail Address is required',
                })}
                errorMessage={form.errors.detail?.message}
                labelTitle="Detail Address"
                labelFor="detail"
                id="detail"
                autoComplete="off"
                variantClass={`${form.selectedCode.Detail && 'ring ring-green-500 shadow-md shadow-green-500/50'} `}
            />

            <Button
                variant={`bg-zinc-700 flex items-center justify-center text-white font-poppins-semibold rounded-md py-2 hover:bg-zinc-800 transition-all duration-300 ease-in-out ${actions.loadingCreateAddress && 'animate-pulse bg-barakaprimary-madder'}`}
                type="submit"
            >
                {' '}
                {actions.loadingCreateAddress ? (
                    <div className="flex gap-2">
                        <Loader2 className="animate-spin" />
                        <h1 className="font-bold">SAVING ADDRESS...</h1>
                    </div>
                ) : (
                    'ADD ADDRESS'
                )}
            </Button>
        </form>
    )
}

export default FormAddress
