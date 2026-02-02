"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AddressSchema,
  AddressSchemaPayloadType,
} from "../types/AddressSchema";
import { AddressResponseType } from "../types/AddressResponse.type";
import {
  CityType,
  DistrictType,
  ProvinceType,
  SubdistrictType,
} from "../../rajaOngkir/types/RajaOngkirResponse.type";

type FormAddressType = {
  mode?: "create" | "update";
  initialData?: AddressResponseType;
};

/**
 * Hook for handle form address assigment using react-hook-form
 *
 * @param {FormAddressType} - object with two properties: mode and initialData
 * @property {string} mode - the mode of the form, either "create" or "update"
 * @property {AddressResponseType} initialData - the initial data of the form when the mode is UPDATE
 * @returns {{ form: useForm<AddressSchemaPayloadType>, handlers: { handleSetProvince: (value: string, provinces: ProvinceType[]) => void, handleSetCity: (value: string, cities: CityType[]) => void, handleSetDistrict: (value: string, districts: DistrictType[]) => void, handleSetSubDistrict: (value: string, subdistricts: SubdistrictType[]) => void }}
 * @example
 * const { form, handlers } = useFormAddress({
 *   mode: "update",
 *   initialData: {
 *     id: 1,
 *     province_id: 1,
 *     province_name: "DKI Jakarta",
 *     city_id: 1,
 *     city_name: "Jakarta Barat",
 *     district_id: 1,
 *     district_name: "Cengkareng",
 *     subdistrict_id: 1,
 *     subdistrict_name: "Cengkareng Timur",
 *     postal_code: "11430",
 *     recipient_name: "John Doe",
 *     phone_number: "081234567890",
 *     mark_as: "home",
 *     detail: "Jalan Jalan",
 *   },
 * });
 */

export default function useFormAddress({
  mode = "create",
  initialData,
}: FormAddressType) {
  /**
   * Return the initial data for the form address based on the mode.
   * If the mode is UPDATE and initialData is provided, the initial data will be the initialData.
   * If the mode is CREATE or initialData is not provided, the initial data will be an empty object.
   * @returns {AddressSchemaPayloadType} - initial data for the form address
   */
  const getInitialData = (): AddressSchemaPayloadType => {
    // todo :✅ if mode is UPDATE the default values of the form will be the initial data
    if (mode === "update" && initialData) {
      return {
        province_id: initialData.province_id.toString(),
        province_name: initialData.province_name,
        city_id: initialData.city_id.toString(),
        city_name: initialData.city_name,
        district_id: initialData.district_id.toString(),
        district_name: initialData.district_name,
        subdistrict_id: initialData.subdistrict_id.toString(),
        subdistrict_name: initialData.subdistrict_name,
        postal_code: initialData.postal_code,
        recipient_name: initialData.recipient_name,
        phone_number: initialData.phone_number,
        mark_as: initialData.mark_as,
        detail: initialData.detail,
      };
    }

    // ✅ if mode is CREATE the default values of the form will be empty
    return {
      province_id: "",
      province_name: "",
      city_id: "",
      city_name: "",
      district_id: "",
      district_name: "",
      subdistrict_id: "",
      subdistrict_name: "",
      postal_code: "",
      recipient_name: "",
      phone_number: "",
      mark_as: "home",
      detail: "",
    };
  };

  const form = useForm<AddressSchemaPayloadType>({
    resolver: zodResolver(AddressSchema),
    defaultValues: getInitialData(),
  });

  //   handle set province name
  const handleSetProvince = (value: string, provinces: ProvinceType[]) => {
    form.setValue("province_id", value);

    form.setValue(
      "province_name",
      provinces.find((p) => p.id === Number(value))?.name || "",
    );

    // reset dependencies fields
    clearDependentFields("province");
  };

  //   handle set city name
  const handleSetCity = (value: string, cities: CityType[]) => {
    form.setValue("city_id", value);

    form.setValue(
      "city_name",
      cities.find((c) => c.id === Number(value))?.name || "",
    );

    // reset dependencies fields
    clearDependentFields("city");
  };

  //   handle set district name
  const handleSetDistrict = (value: string, districts: DistrictType[]) => {
    form.setValue("district_id", value);

    form.setValue(
      "district_name",
      districts.find((d) => d.id === Number(value))?.name || "",
    );

    // reset dependencies fields
    clearDependentFields("district");
  };

  //   handle set subdistrict name
  const handleSetSubDistrict = (
    value: string,
    subdistricts: SubdistrictType[],
  ) => {
    form.setValue("subdistrict_id", value);

    form.setValue(
      "subdistrict_name",
      subdistricts.find((d) => d.id === Number(value))?.name || "",
    );

    form.setValue(
      "postal_code",
      subdistricts.find((d) => d.id === Number(value))?.zip_code || "",
    );
  };

  /**
   * Clear dependent fields based on the given level.
   * When the level is "province", all fields related to city, district, and subdistrict will be cleared.
   * When the level is "city", all fields related to district and subdistrict will be cleared.
   * When the level is "district", all fields related to subdistrict will be cleared.
   */
  const clearDependentFields = (level: "province" | "city" | "district") => {
    const resets = {
      province: [
        "city_id",
        "city_name",
        "district_id",
        "district_name",
        "subdistrict_id",
        "subdistrict_name",
        "postal_code",
      ],
      city: [
        "district_id",
        "district_name",
        "subdistrict_id",
        "subdistrict_name",
        "postal_code",
      ],
      district: ["subdistrict_id", "subdistrict_name", "postal_code"],
    };

    resets[level].forEach((field) => {
      form.setValue(field as keyof AddressSchemaPayloadType, "");
    });
  };

  return {
    form,
    handlers: {
      handleSetProvince,
      handleSetCity,
      handleSetDistrict,
      handleSetSubDistrict,
    },
  };
}
