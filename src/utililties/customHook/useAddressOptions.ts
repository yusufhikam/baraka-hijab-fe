import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProvince } from '../api/CekOngkir/getProvince'
import { getKabupaten } from '../api/CekOngkir/getKabupaten'
import { getKecamatans } from '../api/CekOngkir/getKecamatan'
import { getKelurahan } from '../api/CekOngkir/getKelurahan'

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
