"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressResponseType } from "@/entities/address/types/AddressResponse.type";
import {
  RajaOngkirCostCheckPayloadType,
  RajaOngkirCostCheckResponseType,
  RajaOngkirCostCheckSchema,
} from "@/entities/rajaOngkir/types/RajaOngkirCostCheckSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import CourierList from "./CourierList";
import MyToolTip from "@/components/common/MyToolTip";
import { CheckoutSetShippingPayloadType } from "@/entities/checkout/types/checkout-setShipping.type";
import CourierForm from "./CourierForm";
import { CheckoutSummaryType } from "@/entities/checkout/types/checkout-summary.type";
import { UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/apiResponse.type";
import { RajaOngkirResponse } from "@/entities/rajaOngkir/types/RajaOngkirResponse.type";

type ShippingCalculationProps = {
  address: AddressResponseType | undefined;
  checkoutSummary: CheckoutSummaryType | undefined;
  mutateSetShipping: UseMutationResult<
    ApiResponse<CheckoutSetShippingPayloadType>, //response
    Error, // error
    CheckoutSetShippingPayloadType //payload
  >;

  mutateCekOngkir: UseMutationResult<
    RajaOngkirResponse<RajaOngkirCostCheckResponseType[]>,
    Error,
    RajaOngkirCostCheckPayloadType
  >;
};

type SelectedCourierType = {
  code: string;
  service: string;
};

const ShippingCalculation: React.FC<ShippingCalculationProps> = ({
  address,
  checkoutSummary,
  mutateSetShipping,
  mutateCekOngkir,
}) => {
  const { data: couriers, isPending: isLoadingCekOngkir } = mutateCekOngkir;
  const isLoading = isLoadingCekOngkir || mutateSetShipping.isPending;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RajaOngkirCostCheckPayloadType>({
    resolver: zodResolver(RajaOngkirCostCheckSchema),
  });

  const resultCouriers = couriers?.data;

  // set courier, destination, & weight if summary[shipping] exists
  useEffect(() => {
    if (!checkoutSummary || !address) return;

    setValue("destination", address.subdistrict_id);
    setValue("weight", checkoutSummary?.total_items_weight ?? 0);

    if (checkoutSummary.shipping) {
      setValue("courier", checkoutSummary.shipping.courier, {
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [checkoutSummary, setValue, address]);

  // auto cek ongkir if summary shipping exists
  useEffect(() => {
    if (!checkoutSummary?.shipping || !address) return;

    mutateCekOngkir.mutate({
      courier: checkoutSummary.shipping.courier,
      destination: address.subdistrict_id,
      weight: checkoutSummary?.total_items_weight ?? 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutSummary?.shipping, address, checkoutSummary?.total_items_weight]);

  // handle to mutate set shipping by selected courier
  const handleSelectCourier = useCallback(
    (payload: CheckoutSetShippingPayloadType) => {
      mutateSetShipping.mutate(payload);
    },
    [mutateSetShipping],
  );

  const selectedCourier = useMemo(() => {
    if (!checkoutSummary?.shipping) return;

    const { courier, service } = checkoutSummary.shipping;

    return { code: courier, service } as SelectedCourierType;
  }, [checkoutSummary?.shipping]);

  // mutate on submit cek ongkir after select courier
  const onSubmitCekOngkir = useCallback(
    (payload: RajaOngkirCostCheckPayloadType) => {
      mutateCekOngkir.mutate(payload);
    },
    [mutateCekOngkir],
  );

  return (
    <>
      <Card className={cn("relative", errors.courier && "border-red-500")}>
        {errors.courier && (
          <MyToolTip
            message={errors.courier?.message}
            iconable
            size="lg"
            variant="error"
            className="absolute top-2 right-2"
          />
        )}

        <CardHeader>
          <CardTitle>Shipping calculation</CardTitle>
        </CardHeader>

        <CardContent className="w-full">
          <CourierForm
            control={control}
            onSubmit={handleSubmit(onSubmitCekOngkir)}
            isLoading={isLoading}
          />

          <CourierList
            data={resultCouriers}
            selectedCourier={selectedCourier}
            onSelectedCourier={handleSelectCourier}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ShippingCalculation;
