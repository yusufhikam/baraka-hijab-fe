import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import createAddress from "../api/addresses/createAddress"
import { AddressType, AddressTypePayload } from "../../types/AddressType"
import ToastSweetAlert from "../../components/elements/Alert/Toast/ToastSweetAlert";
import deleteAddress from "../api/addresses/deleteAddress";
import { useMemo, useState } from "react";
import getAddress from "../api/addresses/getAddress";
import setPrimaryAddress from "../api/addresses/setPrimaryAddress";
import { getProvince } from "../api/CekOngkir/getProvince";
import updateAddress from "../api/addresses/updateAddress";
import getAddressById from "../api/addresses/getAddressById";
import { getKabupaten } from "../api/CekOngkir/getKabupaten";
import { getKecamatans } from "../api/CekOngkir/getKecamatan";
import { getKelurahan } from "../api/CekOngkir/getKelurahan";


// GET DATA ADDRESS

export const useGetAddress = () => {
    const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
        queryKey: ['addresses'],
        queryFn: () => getAddress(),
        staleTime: 1000 * 60 * 5, // for 5 minutes
    })

    return { addresses, isLoadingAddresses }
}

// POST DATA ADDRESS
export const useCreateAddress = () => {
    const queryClient = useQueryClient();


    const { mutate, isPending: loadingCreateAddress } = useMutation({
        mutationFn: (data: AddressTypePayload) => createAddress(data),
        onSuccess: () => {
            ToastSweetAlert({
                iconToast: 'success',
                titleToast: 'Success add address',
            })
            queryClient.invalidateQueries({ queryKey: ['addresses'] })
        },
        onError: () => {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed add address',
            })
        }
    })


    // const onSubmit = (data: AddressTypePayload) => mutate(data);

    return { mutate, loadingCreateAddress }
}
// END POST DATA ADDRESS


// DELETE DATA ADDRESS
export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending: loadingDeleteAddress } = useMutation({
        mutationFn: (addressId: number) => deleteAddress(addressId),
        onSuccess: () => {
            ToastSweetAlert({
                iconToast: 'success',
                titleToast: 'Success delete address',
            });
            queryClient.invalidateQueries({ queryKey: ['addresses'] })
        },
        onError: () => {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed delete address',
            })
        }
    })

    return { mutate, loadingDeleteAddress }
}

// END DELETE DATA ADDRESS

// SET MAIN ADDRESS
export const useSetPrimaryAddress = () => {
    // untuk open menu button action [delete, edit, modal detail, set main address]
    const [openMenuAction, setOpenMenuAction] = useState<{
        isOpen: boolean
        addressId: number | null
    }>({
        isOpen: false,
        addressId: null,
    })

    const queryClient = useQueryClient() // for invalidate cache
    // update main address
    const { mutate: setMainAddress, isPending } = useMutation({
        mutationFn: (addressId: number) => setPrimaryAddress(addressId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] })
            ToastSweetAlert({
                iconToast: 'success',
                titleToast: 'Success set main address',
            })
        },
        onError: () => {
            ToastSweetAlert({
                iconToast: 'error',
                titleToast: 'Failed set main address',
            })
        },
    })


    return {
        setMainAddress,
        isPending,
        openMenuAction,
        setOpenMenuAction
    }
}
// END SET MAIN ADDRESS


export const useAddressDetail = (formFor: 'edit' | 'add', addressId: AddressType['id']) => {
    const isEdit = formFor === 'edit' && !!addressId;

    const { data: addressData, isLoading: isLoadingAddress, isSuccess, refetch } = useQuery({
        queryKey: ['address', addressId],
        queryFn: () => getAddressById(addressId),
        enabled: isEdit
    })

    const wilayahName = {
        provinsi: addressData?.provinsi,
        kabupaten: addressData?.kabupaten,
        kecamatan: addressData?.kecamatan,
        kelurahan: addressData?.kelurahan
    }
    // GET DATA PROVINCE
    const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
        queryKey: ['provinces'],
        queryFn: () => getProvince(),
    })

    const provinceCode = useMemo(() => {
        return provinces?.find((prov) => prov.name === wilayahName.provinsi)?.code || ''
    }, [provinces, wilayahName.provinsi])

    // GET DATA KABUPATEN
    const { data: kabupatens, isLoading: isLoadingKabupaten, refetch: refetchKabupaten } = useQuery({
        queryKey: ['kabupatens', provinceCode],
        queryFn: () => getKabupaten(provinceCode!),
        enabled: !!provinceCode
    });

    const kabupatenCode = useMemo(() => {
        return kabupatens?.find(kab => kab.name === wilayahName.kabupaten)?.code || ''
    }, [kabupatens, wilayahName.kabupaten])

    // GET DATA KECAMATAN
    const { data: kecamatans, isLoading: isLoadingKecamatan } = useQuery({
        queryKey: ['kecamatans', kabupatenCode],
        queryFn: () => getKecamatans(kabupatenCode!),
        enabled: !!kabupatenCode
    });

    const kecamatanCode = useMemo(() => {
        return kecamatans?.find(kec => kec.name === wilayahName.kecamatan)?.code
    }, [kecamatans, wilayahName.kecamatan])

    // GET DATA KELURAHAN
    const { data: kelurahans, isLoading: isLoadingKelurahan } = useQuery({
        queryKey: ['kelurahans', kecamatanCode],
        queryFn: () => getKelurahan(kecamatanCode!),
        enabled: !!kecamatanCode
    });

    const kelurahanCode = useMemo(() => {
        return kelurahans?.find(kel => kel.name === wilayahName.kelurahan)?.code
    }, [kelurahans, wilayahName.kelurahan])

    const isLoadingData = isEdit && (isLoadingAddress || isLoadingProvinces || isLoadingKabupaten || isLoadingKecamatan || isLoadingKelurahan)
    const wilayahCode = {
        provinsi: provinceCode,
        kabupaten: kabupatenCode,
        kecamatan: kecamatanCode,
        kelurahan: kelurahanCode
    }


    return { addressData, isSuccess, refetch, wilayahCode, isLoadingData, refetchKabupaten }
}

export const useUpdateAddress = () => {


    // get address data 
    const { data: provinces } = useQuery({
        queryKey: ['provinsces'],
        queryFn: () => getProvince(),
    })

    // const { } = useMutation({
    //     mutationFn: (addressId: number) => updateAddress({ addressId, })
    // })



    return {
        provinces,
    }
}

