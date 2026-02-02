"use client";

import useAddressQuery from "@/entities/address/hooks/useAddressQuery";
import dynamic from "next/dynamic";
import ShippingCalculation from "../ShippingCalculation";
import useCheckoutQuery from "@/entities/checkout/hooks/useCheckoutQuery";
import BillingDetails from "../BillingDetails";
import useRajaOngkirQuery from "@/entities/rajaOngkir/hooks/useRajaOngkirQuery";

const UserPrimaryAddress = dynamic(
  () => import("@/features/_checkout/_components/UserPrimaryAddress"),
);

export default function CheckoutContents() {
  const {
    userPrimaryAddress: { data: addressData, isLoading },
  } = useAddressQuery();

  const {
    checkoutSummary,
    isLoadingSummary,
    mutateCheckoutTransaction: {
      mutateAsync: createTransaction,
      isPending: isCreating,
    },
    mutateSetShipping,
  } = useCheckoutQuery({ isCheckoutPage: true });

  const { mutateCekOngkir } = useRajaOngkirQuery();

  const address = addressData?.data;

  return (
    <section className="relative mt-10 flex w-full flex-col items-start justify-between gap-5 md:flex-row">
      {/* LEFT SECTION */}

      <section className="w-full min-w-xs space-y-5 md:w-2/3">
        <UserPrimaryAddress address={address} isLoading={isLoading} />

        <ShippingCalculation
          address={address}
          checkoutSummary={checkoutSummary}
          mutateSetShipping={mutateSetShipping}
          mutateCekOngkir={mutateCekOngkir}
        />
      </section>

      {/* RIGHT SECTION */}

      <BillingDetails
        addressId={address?.id}
        summary={checkoutSummary}
        createTransaction={createTransaction}
        isCreating={isCreating}
        isLoadingSummary={isLoadingSummary}
      />
    </section>
  );
}
