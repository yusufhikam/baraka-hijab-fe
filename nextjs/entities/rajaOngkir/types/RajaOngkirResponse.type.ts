export type RajaOngkirResponse<T> = {
  meta: {
    message: string;
    code: number;
    status: string;
  };
  data: T;
};

export type ProvinceType = {
  id: number;
  name: string;
};

export type CityType = {
  id: number;
  name: string;
};

export type DistrictType = {
  id: number;
  name: string;
};

export type SubdistrictType = {
  id: number;
  name: string;
  zip_code: string;
};
