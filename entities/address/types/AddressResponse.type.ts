export interface AddressResponseType {
  id: number;
  //   user_id: number;
  province_id: number;
  province_name: string;
  city_id: number;
  city_name: string;
  district_id: number;
  district_name: string;
  subdistrict_id: number;
  subdistrict_name: string;
  postal_code: string;
  recipient_name: string;
  phone_number: string;
  mark_as: "home" | "office" | "store";
  detail: string;
  is_primary: boolean;
  label: string;
}
