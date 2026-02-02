import ApiClient from "@/lib/axios/apiClient";
import { baseApiURL } from "@/lib/utils";
import { ApiResponse } from "@/types/apiResponse.type";
import { AddressResponseType } from "../types/AddressResponse.type";
import { AddressSchemaPayloadType } from "../types/AddressSchema";

/**
 * @file addressApi.service.ts
 * @description addressApi is service for call user address API
 *
 * @requires ApiClient -- axios instance
 * @requires baseApiURL -- base url from backend endpoint
 *
 * @param payload -- is required for create and update address body
 * @param addressId -- is required for update and delete address endpoint for get single data of address
 *
 *
 * @exports addressApi
 *
 * @returns {
 *
 * get: () => Promise<ApiResponse<AddressResponseType[]>>
 * create: (payload: AddressSchemaPayloadType) => Promise<ApiResponse<AddressResponseType>>
 * update: (payload: AddressSchemaPayloadType, addressId: number) => Promise<ApiResponse<AddressResponseType>>
 * delete: (addressId: number) => Promise<ApiResponse<AddressResponseType>>
 * setPrimary: (addressId: number) => Promise<ApiResponse<AddressResponseType>>
 * getPrimaryAddress: () => Promise<ApiResponse<AddressResponseType>>
 *
 * }
 */

const addressApi = {
  get: async (): Promise<ApiResponse<AddressResponseType[]>> => {
    const res = await ApiClient.get(`${baseApiURL}/addresses`);

    return res.data;
  },
  create: async (payload: AddressSchemaPayloadType) => {
    const res = await ApiClient.post(`${baseApiURL}/addresses`, payload);

    return res.data;
  },
  update: async (payload: AddressSchemaPayloadType, addressId: number) => {
    const res = await ApiClient.patch(
      `${baseApiURL}/addresses/${addressId}`,
      payload,
    );

    return res.data;
  },
  delete: async (addressId: number) => {
    const res = await ApiClient.delete(`${baseApiURL}/addresses/${addressId}`);

    return res.data;
  },
  setPrimary: async (addressId: number) => {
    const res = await ApiClient.patch(
      `${baseApiURL}/addresses/${addressId}/set-primary`,
    );

    return res.data;
  },
  getPrimaryAddress: async (): Promise<ApiResponse<AddressResponseType>> => {
    const res = await ApiClient.get(
      `${baseApiURL}/addresses/user/primary-address`,
    );

    return res.data;
  },
};

export default addressApi;
