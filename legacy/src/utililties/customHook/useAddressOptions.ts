import { getKecamatans } from './../api/CekOngkir/getKecamatan'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProvince } from '../api/CekOngkir/getProvince'
import { getKabupaten } from '../api/CekOngkir/getKabupaten'
import { getKelurahan } from '../api/CekOngkir/getKelurahan'
import { AddressType } from '../../types/AddressType'
import { useMemo } from 'react'

export const useProvinces = () => {
    return useQuery({
        queryKey: ['provinces'],
        queryFn: () => getProvince(),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    })
}

export const useKabupatens = (provinceCode: string) => {
    return useQuery({
        queryKey: ['kabupatens', provinceCode],
        queryFn: () => getKabupaten(provinceCode),
        enabled: !!provinceCode,
        staleTime: 1000 * 60 * 5, //for 5 minutes
        placeholderData: keepPreviousData,
    })
}

export const useKecamatans = (kabupatenCode: string) => {
    return useQuery({
        queryKey: ['kecamatans', kabupatenCode],
        queryFn: () => getKecamatans(kabupatenCode),
        enabled: !!kabupatenCode,
        staleTime: 1000 * 60 * 5, //for 5 minutes
        placeholderData: keepPreviousData,
    })
}

export const useKelurahans = (kecamatanCode: string) => {
    return useQuery({
        queryKey: ['kelurahans', kecamatanCode],
        queryFn: () => getKelurahan(kecamatanCode),
        enabled: !!kecamatanCode,
        staleTime: 1000 * 60 * 5, //for 5 minutes
        placeholderData: keepPreviousData,
    })
}

export const useWilayahName = (address: AddressType | undefined) => {
    const { data: provinces } = useProvinces()

    const { data: kabupatens } = useKabupatens(address?.provinsi || '')

    const { data: kecamatans } = useKecamatans(address?.kabupaten || '')

    const { data: kelurahans } = useKelurahans(address?.kecamatan || '')

    const wilayahName = {
        provinsi: useMemo(() => {
            return provinces?.find((p) => p.code === address?.provinsi)?.name
        }, [address?.provinsi, provinces]),

        kabupaten: useMemo(() => {
            return kabupatens?.find((k) => k.code === address?.kabupaten)?.name
        }, [address?.kabupaten, kabupatens]),

        kecamatans: useMemo(() => {
            return kecamatans?.find((k) => k.code === address?.kecamatan)?.name
        }, [address?.kecamatan, kecamatans]),

        kelurahans: useMemo(() => {
            return kelurahans?.find((k) => k.code === address?.kelurahan)?.name
        }, [address?.kelurahan, kelurahans]),
    }

    return { wilayahName }
}
