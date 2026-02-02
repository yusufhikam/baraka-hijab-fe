"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import useAddressQuery from "@/entities/address/hooks/useAddressQuery";
import useFormAddress from "@/entities/address/hooks/useFormAddress";
import { AddressResponseType } from "@/entities/address/types/AddressResponse.type";
import { AddressSchemaPayloadType } from "@/entities/address/types/AddressSchema";
import { Loader2 } from "lucide-react";
import SelectForm from "./form-components/SelectForm";
import PhoneInputForm from "./form-components/PhoneInputForm";
import RecipientNameInputForm from "./form-components/RecipientNameInputForm";
import PostalCodeInputForm from "./form-components/PostalCodeInputForm";
import MarkAsToggleInputForm from "./form-components/MarkAsToggleInputForm";
import useRajaOngkirQuery from "@/entities/rajaOngkir/hooks/useRajaOngkirQuery";
import { useWatch } from "react-hook-form";
import DetailAddressInput from "./form-components/DetailAddressInput";

type FormAddressProps = {
  mode?: "create" | "update";
  initialData?: AddressResponseType;
  onOpenChange: (open: boolean) => void;
};

/**
 * FormAddress component is a form component for creating or updating an address.
 * It uses useFormAddress hook to generate the form and handlers for the form.
 * It also uses useRajaOngkirQuery hook to fetch the list of provinces, cities, districts, and subdistricts.
 * The component takes three props: mode, initialData, and onOpenChange.
 * The mode prop determines whether the form is for creating or updating an address.
 * The initialData prop is the initial data for the form when the mode is "update".
 * The onOpenChange prop is a function that is called when the form is submitted or closed.
 * The component returns a form element with the form fields and a submit button.
 * The form fields include recipient name, phone number, province, city, district, subdistrict, postal code, and detail address.
 * The submit button is disabled when the form is submitting.
 * The component also displays a loader when the form is submitting.
 * The component uses DialogClose component to close the form when the close button is clicked.
 * The component uses Button component to render the submit button.
 * The component uses Loader2 component to render the loader when the form is submitting.
 */
export default function FormAddress({
  mode = "create",
  initialData,
  onOpenChange,
}: FormAddressProps) {
  const {
    form,
    handlers: {
      handleSetCity,
      handleSetDistrict,
      handleSetProvince,
      handleSetSubDistrict,
    },
  } = useFormAddress({
    mode,
    initialData,
  });

  // get ID of province, city, and district for cascading selection using useWatch
  const province_id = useWatch({ control: form.control, name: "province_id" });
  const city_id = useWatch({ control: form.control, name: "city_id" });
  const district_id = useWatch({ control: form.control, name: "district_id" });

  const rajaOngkirQuery = useRajaOngkirQuery({
    province_id: province_id,
    city_id: city_id,
    district_id: district_id,
  });

  const { mutateCreateAddress, mutateUpdateAddress } = useAddressQuery();

  /**
   * Handle form submission based on mode.
   * If mode is "create", it will call mutateCreateAddress with the payload.
   * If mode is "update", it will call mutateUpdateAddress with the payload and addressId.
   * It will also call onOpenChange(false) when the mutation is successful.
   */
  const onSubmit = (payload: AddressSchemaPayloadType) => {
    if (mode === "create") {
      mutateCreateAddress.mutate(payload, {
        onSuccess: () => onOpenChange(false),
      });
    } else if (mode === "update") {
      if (!initialData) {
        console.error("initialData not found");
        return;
      }

      mutateUpdateAddress.mutate(
        { data: payload, addressId: initialData.id },
        { onSuccess: () => onOpenChange(false) },
      );
    }
  };

  const isLoadingCreateAddress = !!mutateCreateAddress.isPending;
  const isLoadingUpdateAddress = !!mutateUpdateAddress.isPending;

  const isSubmitting = isLoadingCreateAddress || isLoadingUpdateAddress;

  return (
    <form
      autoComplete="off"
      onSubmit={form.handleSubmit(onSubmit)}
      className="font-geist w-full"
    >
      <section className="max-h-[300px] space-y-4 overflow-y-auto px-1 py-1">
        <RecipientNameInputForm
          form={form}
          errorMessage={form.formState.errors.recipient_name?.message}
        />

        <PhoneInputForm
          form={form}
          errorMessage={form.formState.errors.phone_number?.message}
        />

        <SelectForm
          data={rajaOngkirQuery.provinces?.data}
          form={form}
          tag="province"
          errorMessage={form.formState.errors.province_id?.message}
          isLoading={rajaOngkirQuery.isLoadingProvinces}
          onChange={(value) =>
            handleSetProvince(value, rajaOngkirQuery.provinces?.data || [])
          }
        />

        <SelectForm
          data={rajaOngkirQuery.cities?.data}
          form={form}
          tag="city"
          errorMessage={form.formState.errors.city_id?.message}
          isLoading={rajaOngkirQuery.isLoadingCities}
          onChange={(value) =>
            handleSetCity(value, rajaOngkirQuery.cities?.data || [])
          }
        />

        <SelectForm
          data={rajaOngkirQuery.districts?.data}
          form={form}
          tag="district"
          errorMessage={form.formState.errors.district_id?.message}
          isLoading={rajaOngkirQuery.isLoadingDistricts}
          onChange={(value) =>
            handleSetDistrict(value, rajaOngkirQuery.districts?.data || [])
          }
        />

        <SelectForm
          data={rajaOngkirQuery.subdistricts?.data}
          form={form}
          tag="subdistrict"
          errorMessage={form.formState.errors.subdistrict_id?.message}
          isLoading={rajaOngkirQuery.isLoadingSubdistricts}
          onChange={(value) =>
            handleSetSubDistrict(
              value,
              rajaOngkirQuery.subdistricts?.data || [],
            )
          }
        />

        <PostalCodeInputForm
          form={form}
          errorMessage={form.formState.errors.postal_code?.message}
        />

        <DetailAddressInput form={form} />

        <MarkAsToggleInputForm
          form={form}
          errorMessage={form.formState.errors.mark_as?.message}
        />
      </section>

      <div className="mt-5 inline-flex w-full items-center justify-center gap-5 sm:justify-end">
        <DialogClose asChild>
          <Button
            type="button"
            disabled={isSubmitting}
            variant={"outline"}
            className="w-20"
          >
            Close
          </Button>
        </DialogClose>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="bg-baraka-lightgreen-200 w-20"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : mode === "create" ? (
            "Save"
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </form>
  );
}
