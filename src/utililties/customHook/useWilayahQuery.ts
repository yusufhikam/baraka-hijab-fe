import { useQuery } from "@tanstack/react-query";
import { getProvince } from "../api/CekOngkir/getProvince";
import { getKabupaten } from "../api/CekOngkir/getKabupaten";
import { getKecamatans } from "../api/CekOngkir/getKecamatan";
import { getKelurahan } from "../api/CekOngkir/getKelurahan";


type AddressQueryType = {
    // selectedCode: {
    Province: string;
    Kabupaten: string;
    Kecamatan: string;
    Kelurahan: string;
    // }
}

const useWilayahQuery = (selectedCode: AddressQueryType) => {

    // GET DATA WILAYAH
    const { data: provinces = [], isLoading: isLoadingProvinces } = useQuery({
        queryKey: ['provinces'],
        queryFn: () => getProvince(),
    })

    const { data: kabupatens = [], isLoading: isLoadingKabupaten } = useQuery({
        queryKey: ['kabupaten', selectedCode.Province],
        queryFn: () => getKabupaten(selectedCode.Province),
        enabled: !!selectedCode.Province,
    })

    const { data: kecamatans, isLoading: isLoadingKecamatan } = useQuery({
        queryKey: ['kecamatan', selectedCode.Kabupaten],
        queryFn: () => getKecamatans(selectedCode.Kabupaten),
        enabled: !!selectedCode.Kabupaten
    });

    const { data: kelurahans, isLoading: isLoadingKelurahan } = useQuery({
        queryKey: ['kelurahan', selectedCode.Kecamatan],
        queryFn: () => getKelurahan(selectedCode.Kecamatan),
        enabled: !!selectedCode.Kecamatan
    })

    const dataLoading = {
        isLoadingProvinces,
        isLoadingKabupaten,
        isLoadingKecamatan,
        isLoadingKelurahan
    }
    // END GET DATA WILAYAH

    return { provinces, kabupatens, kecamatans, kelurahans, dataLoading }
}


export default useWilayahQuery;