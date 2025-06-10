import { useForm } from "react-hook-form"
import { useCreateAddress, useDeleteAddress } from "./useAddressMutation"
import { AddressTypePayload } from "../../types/AddressType"
import useWilayahQuery from "./useWilayahQuery"
import { useMemo } from "react"


const useAddress = () => {
    const { register, watch, reset, handleSubmit, setValue, resetField, formState: { errors }, getValues } = useForm(
        {
            defaultValues: {
                provinsi: '',
                kabupaten: '',
                kecamatan: '',
                kelurahan: '',
                postal_code: '',
                detail: '',
            },
        }
    )

    const selectedCode = { // selected by watch
        Province: watch('provinsi'),
        Kabupaten: watch('kabupaten'),
        Kecamatan: watch('kecamatan'),
        Kelurahan: watch('kelurahan'),
        Detail: watch('detail')
    }

    // GET DATA ADDRESS BY CODE PER WILAYAH
    const { provinces, kabupatens, kecamatans, kelurahans, dataLoading } = useWilayahQuery(selectedCode)

    // POST DATA ADDRESS
    const { mutate: onSubmit, loadingCreateAddress } = useCreateAddress(); // the 'reset' react hook form property is for reset form from useForm after success add address
    // find data name for [provinsi, kabupaten, kecamatan, kelurahan] by code instead only store the code
    const provinsiName = useMemo(() => provinces?.find((prov) => prov.code === selectedCode.Province)?.name || '', [provinces, selectedCode.Province])
    const kabupateniName = useMemo(() => kabupatens?.find((prov) => prov.code === selectedCode.Kabupaten)?.name || '', [kabupatens, selectedCode.Kabupaten])
    const kecamatanName = useMemo(() => kecamatans?.find((prov) => prov.code === selectedCode.Kecamatan)?.name || '', [kecamatans, selectedCode.Kecamatan])
    const kelurahanName = useMemo(() => kelurahans?.find((prov) => prov.code === selectedCode.Kelurahan)?.name || '', [kelurahans, selectedCode.Kelurahan])

    const payloadData = {
        provinsiName,
        kabupateniName,
        kecamatanName,
        kelurahanName
    }
    const payload: AddressTypePayload = {
        provinsi: payloadData.provinsiName,
        kabupaten: payloadData.kabupateniName,
        kecamatan: payloadData.kecamatanName,
        kelurahan: payloadData.kelurahanName,
        postal_code: watch('postal_code'),
        detail: watch('detail'),
    }


    // UPDATE DATA ADDRESS


    // DELETE DATA ADDRESS
    const { mutate: onDelete, loadingDeleteAddress } = useDeleteAddress();

    return {
        form: {
            register,
            watch,
            handleSubmit,
            setValue,
            getValues,
            payload,
            reset,
            resetField,
            errors,
            selectedCode
        },
        wilayah: {
            provinces,
            kabupatens,
            kecamatans,
            kelurahans,
            dataLoading,
        },
        actions: {
            onSubmit,
            loadingCreateAddress,
            onDelete,
            loadingDeleteAddress
        }
    }
}


export default useAddress