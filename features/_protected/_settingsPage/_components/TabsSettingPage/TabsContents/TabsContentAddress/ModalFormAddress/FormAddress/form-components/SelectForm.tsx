import MyToolTip from "@/components/common/MyToolTip";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressSchemaPayloadType } from "@/entities/address/types/AddressSchema";
import {
  CityType,
  DistrictType,
  ProvinceType,
  SubdistrictType,
} from "@/entities/rajaOngkir/types/RajaOngkirResponse.type";
import { cn } from "@/lib/utils";
import { Controller, UseFormReturn } from "react-hook-form";

type SelectFormProps = {
  //   value: string;
  onChange: (value: string) => void;
  tag: "province" | "city" | "district" | "subdistrict";
  data:
    | ProvinceType[]
    | CityType[]
    | DistrictType[]
    | SubdistrictType[]
    | undefined;
  errorMessage?: string;
  isLoading?: boolean;
  form: UseFormReturn<AddressSchemaPayloadType>;
};

/**
 * SelectForm is a component that renders a dropdown select form
 * @param {Object} props - props object
 * @param {Object} props.data - data to be rendered in the select dropdown
 * @param {Function} props.onChange - function to be called when user selects an option
 * @param {string} props.tag - type of address element to be rendered (province, city, district, subdistrict)
 * @param {string} props.errorMessage - error message to be displayed
 * @param {boolean} props.isLoading - whether the data is being loaded
 * @param {Object} props.form - form object from react-hook-form
 * @returns {JSX.Element} - the select form component
 */
export default function SelectForm({
  data,
  onChange,
  tag,
  //   value,
  errorMessage,
  isLoading,
  form,
}: SelectFormProps) {
  const labelName =
    tag === "province"
      ? "Province"
      : tag === "city"
        ? "City"
        : tag === "district"
          ? "District"
          : "Subdistrict / Village";

  const controllerName =
    tag === "province"
      ? "province_id"
      : tag === "city"
        ? "city_id"
        : tag === "district"
          ? "district_id"
          : "subdistrict_id";

  const nullSelectMessage =
    tag === "city"
      ? "Please Select Province First"
      : tag === "district"
        ? "Please Select City First"
        : tag === "subdistrict"
          ? "Please Select District First"
          : "";
  return (
    <div className="relative space-y-2">
      <Label className={cn("", errorMessage && "text-red-500")}>
        {labelName}
      </Label>
      <Controller
        name={controllerName}
        control={form.control}
        render={({ field }) => (
          <Select onValueChange={onChange} value={field.value}>
            <SelectTrigger
              className={cn(
                "ring-baraka-primary-300 border-baraka-lightgreen-200 w-full border focus:border-0 focus:ring-2",
                errorMessage && "border-2 border-red-500",
              )}
            >
              <SelectValue placeholder={`Select ${labelName}`} />
            </SelectTrigger>

            <SelectContent
              side="bottom"
              position="popper"
              className="max-h-[300px]"
            >
              {isLoading ? (
                `Loading ${labelName}...`
              ) : !data ? (
                <p>{nullSelectMessage}</p>
              ) : (
                data.map((item) => (
                  <SelectItem key={item.id} value={`${item.id}`}>
                    {item.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}
      />

      {errorMessage && (
        <MyToolTip
          message={errorMessage}
          iconable
          size="sm"
          variant="error"
          className="absolute top-[55%] right-10"
        />
      )}
    </div>
  );
}
