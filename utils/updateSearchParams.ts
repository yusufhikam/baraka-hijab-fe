// import { ProductParamsQuery } from "@/entities/product/types/productParamQuery.type";
import { ReadonlyURLSearchParams } from "next/navigation";

type UpdateSearchParamsProps = {
  searchParams: ReadonlyURLSearchParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  key: any;
  value: string | null;
};
export default function updateSearchParams({
  searchParams,
  key,
  value,
}: UpdateSearchParamsProps) {
  const params = new URLSearchParams(searchParams.toString());

  if (value === null || value === "") {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  return params.toString();
}
