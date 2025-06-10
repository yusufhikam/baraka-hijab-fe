import { useQuery } from "@tanstack/react-query"
import { getProvince } from "../api/CekOngkir/getProvince"
import { getKabupaten } from "../api/CekOngkir/getKabupaten"
import { getKecamatans } from "../api/CekOngkir/getKecamatan"
import { getKelurahan } from "../api/CekOngkir/getKelurahan"

export const useProvinces = () => {
    return useQuery({
        queryKey: ['provinces'],
        queryFn: () => getProvince(),
    })
}

export const useKabupatens = (provinceCode: string) => {
    return useQuery({
        queryKey: ['kabupatens', provinceCode],
        queryFn: () => getKabupaten(provinceCode),
    });
}

export const useKecamatans = (kabupatenCode: string) => {
    return useQuery({
        queryKey: ['kecamatans', kabupatenCode],
        queryFn: () => getKecamatans(kabupatenCode)
    })
}

export const useKelurahans = (kecamatanCode: string) => {
    return useQuery({
        queryKey: ['kelurahans', kecamatanCode],
        queryFn: () => getKelurahan(kecamatanCode)
    })
}