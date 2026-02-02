/**
 * * Hook for handle fetching raja ongkir API using Tanstack Query
 * @requires rajaOngkirApi
 *
 * # require params for cascading region selection
 * @param province_id - is required for get cities
 * @param city_id - is required for get districts
 * @param district_id - is required for get subdistricts
 *
 * @returns {
 *    getProvinces: () => Promise<RajaOngkirResponse<ProvinceType[]>>
 *    getCities: (province_id: number) => Promise<RajaOngkirResponse<CityType[]>>
 *    getDistricts: (city_id: number) => Promise<RajaOngkirResponse<DistrictType[]>>
 *    getSubdistricts: (district_id: number) => Promise<RajaOngkirResponse<SubdistrictType[]>>
 * }
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import rajaOngkirApi from "../api/rajaOngkirApi.service";
import { toast } from "sonner";
import { RajaOngkirCostCheckPayloadType } from "../types/RajaOngkirCostCheckSchema";

type RajaOngkirProps = {
  province_id?: string;
  city_id?: string;
  district_id?: string;
};

export default function useRajaOngkirQuery({
  province_id,
  city_id,
  district_id,
}: RajaOngkirProps = {}) {
  // get provinces
  const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: () => rajaOngkirApi.getProvinces(),
    staleTime: 60 * 60, // 1 hour
    gcTime: 60 * 60 * 24, // 1 day
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // get cities
  const { data: cities, isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities", province_id],
    queryFn: () => rajaOngkirApi.getCities(Number(province_id)),
    staleTime: 60 * 60, // 1 hour
    gcTime: 60 * 60 * 24, // 1 day
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!province_id,
  });

  //   GET DISTRICTS
  const { data: districts, isLoading: isLoadingDistricts } = useQuery({
    queryKey: ["districts", city_id],
    queryFn: () => rajaOngkirApi.getDistricts(Number(city_id)),
    staleTime: 60 * 60, // 1 hour
    gcTime: 60 * 60 * 24, // 1 day
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!city_id,
  });

  //     GET SUB-DISTRICTS
  const { data: subdistricts, isLoading: isLoadingSubdistricts } = useQuery({
    queryKey: ["sub-districts", district_id],
    queryFn: () => rajaOngkirApi.getSubdistricts(Number(district_id)),
    staleTime: 60 * 60, // 1 hour
    gcTime: 60 * 60 * 24, // 1 day
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!district_id,
  });

  // cek ongkir & check courier
  const mutateCekOngkir = useMutation({
    mutationFn: (payload: RajaOngkirCostCheckPayloadType) =>
      rajaOngkirApi.cekOngkir(payload),
    onError: (error) => {
      toast.error("Failed to get courier", {
        description: error.message,
        duration: 1000,
        position: "top-right",
      });
    },
  });

  return {
    provinces,
    isLoadingProvinces,

    cities,
    isLoadingCities,

    districts,
    isLoadingDistricts,

    subdistricts,
    isLoadingSubdistricts,

    mutateCekOngkir,
  };
}
