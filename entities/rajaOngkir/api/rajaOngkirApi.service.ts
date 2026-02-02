/**
 * @file rajaOngkirApi.service.ts
 * @description rajaOngkirApi is service for call rajaOngkir API
 *
 *  @exports rajaOngkirApi
 *
 *  @requires baseApiURL - base url from backend endpoint
 *
 * * require params for cascading region selection
 *  @param province_id - is required for get cities
 *  @param city_id - is required for get districts
 *  @param district_id - is required for get subdistricts
 *  @param payload - is required for cek ongkir
 *
 *
 *  @returns {
 *    getProvinces: () => Promise<RajaOngkirResponse<ProvinceType[]>>
 *    getCities: (province_id: number) => Promise<RajaOngkirResponse<CityType[]>>
 *    getDistricts: (city_id: number) => Promise<RajaOngkirResponse<DistrictType[]>>
 *    getSubdistricts: (district_id: number) => Promise<RajaOngkirResponse<SubdistrictType[]>>
 *    cekOngkir: (payload: CekOngkirPayloadType) => Promise<RajaOngkirResponse<CekOngkirResponseType[]>>
 *  }
 *
 */

import { baseApiURL } from "@/lib/utils";
import {
  CityType,
  DistrictType,
  ProvinceType,
  RajaOngkirResponse,
  SubdistrictType,
} from "../types/RajaOngkirResponse.type";
import ApiClient from "@/lib/axios/apiClient";
import {
  RajaOngkirCostCheckPayloadType,
  RajaOngkirCostCheckResponseType,
} from "../types/RajaOngkirCostCheckSchema";

const rajaOngkirApi = {
  getProvinces: async (): Promise<RajaOngkirResponse<ProvinceType[]>> => {
    const res = await fetch(`${baseApiURL}/rajaongkir/provinces`);

    return res.json();
  },
  getCities: async (
    province_id: number,
  ): Promise<RajaOngkirResponse<CityType[]>> => {
    const res = await fetch(`${baseApiURL}/rajaongkir/cities/${province_id}`);

    return res.json();
  },
  getDistricts: async (
    city_id: number,
  ): Promise<RajaOngkirResponse<DistrictType[]>> => {
    const res = await fetch(`${baseApiURL}/rajaongkir/districts/${city_id}`);

    return res.json();
  },
  getSubdistricts: async (
    district_id: number,
  ): Promise<RajaOngkirResponse<SubdistrictType[]>> => {
    const res = await fetch(
      `${baseApiURL}/rajaongkir/sub-districts/${district_id}`,
    );

    return res.json();
  },
  cekOngkir: async (
    payload: RajaOngkirCostCheckPayloadType,
  ): Promise<RajaOngkirResponse<RajaOngkirCostCheckResponseType[]>> => {
    try {
      const res = await ApiClient.post(
        `${baseApiURL}/rajaongkir/cost`,
        payload,
      );

      return res.data;
    } catch (err) {
      console.error("🚀 ~ err:", err);
      throw err;
    }
  },
};

export default rajaOngkirApi;
