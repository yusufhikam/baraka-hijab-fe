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

type FormAddressProps = {
    onSubmit: () => void
    defaultValues: AddressTypePayload
    isLoading: boolean
}
const FormAddress2 = ({
    onSubmit,
    defaultValues,
    isLoading,
}: FormAddressProps) => {
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

    const { data: provinces = [] } = useProvinces()
    const { data: kabupatens = [] } = useKabupatens(selectedCodeProvinsi)
    const { data: kecamatans = [] } = useKecamatans(selectedCodeKabupaten)
    const { data: kelurahans = [] } = useKelurahans(selectedCodeKecamatan)

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Select
                {...register('provinsi', { required: 'Provinsi is required' })}
                labelFor="provinsi"
                labelTitle="Provinsi"
                errorMessage={errors.provinsi?.message}
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
                errorMessage={errors.kabupaten?.message}
            >
                <option value="">-- Select Kabupaten --</option>
                {kabupatens.map((kab) => (
                    <option key={kab.code} value={kab.code}>
                        {kab.name}
                    </option>
                ))}
            </Select>
        </form>
    )
}

export default FormAddress2
