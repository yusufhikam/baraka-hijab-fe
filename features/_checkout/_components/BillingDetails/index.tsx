"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMidtransPayment from "@/entities/checkout/hooks/useMidtransPayment";
import { CheckoutSummaryType } from "@/entities/checkout/types/checkout-summary.type";
import { CheckoutTransactionResponseType } from "@/entities/checkout/types/checkout-transaction.type";
import { cn, moneyFormatter } from "@/lib/utils";
import { ApiResponse } from "@/types/apiResponse.type";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { toast } from "sonner";
import BillingDetailsSkeleton from "./BillingDetailsSkeleton";
import { Loader2 } from "lucide-react";

type BillingDetailsProps = {
  addressId: number | undefined;
  summary: CheckoutSummaryType | undefined;
  createTransaction: UseMutateAsyncFunction<
    ApiResponse<CheckoutTransactionResponseType>,
    Error,
    number,
    unknown
  >;

  isCreating?: boolean;
  isLoadingSummary?: boolean;
};

const BillingDetails: React.FC<BillingDetailsProps> = ({
  addressId,
  summary: checkoutSummary,
  createTransaction,
  isCreating,
  isLoadingSummary,
}) => {
  const { initiatePayment, isProcessing } = useMidtransPayment();

  const isSelectedCourier = checkoutSummary?.shipping;

  const handlePay = async () => {
    if (!addressId) return new Error("Please set your primary address.");

    try {
      const res = await createTransaction(addressId);

      const { snap_token, order_id } = res.data;

      if (!snap_token) return new Error("Missing snap token");

      await initiatePayment(snap_token, order_id);
    } catch (err) {
      console.error("🚀 ~ handlePay ~ err:", err);
      toast.error("Failed to make a payment. Please try again.", {
        position: "top-right",
      });
    }
  };

  const isDisabled = !isSelectedCourier || isCreating || isProcessing;

  if (isLoadingSummary) return <BillingDetailsSkeleton />;
  if (!checkoutSummary || !checkoutSummary?.items.length) return null;

  return (
    <Card className="sticky top-20 bottom-0 w-full min-w-xs md:w-1/2">
      <CardHeader>
        <CardTitle>Billing details</CardTitle>
      </CardHeader>

      <CardContent>
        <section className="space-y-2">
          <div className="space-y-2">
            {checkoutSummary &&
              checkoutSummary.items.map((item) => (
                <div
                  className="border-b pb-2 uppercase"
                  key={item.product_variant_option_id}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="">
                      <p>{item.name}</p>
                      <div className="inline-flex items-center gap-2 text-xs">
                        <div
                          style={{ backgroundColor: item.variant.color }}
                          className="size-3 rounded-full"
                        />
                        <span>/</span>
                        <p>{item.size}</p>
                      </div>
                    </div>
                    <p>
                      {moneyFormatter(item.price)} <b>x {item.quantity}</b>
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-10 space-y-1">
            <div className="inline-flex w-full items-start justify-between">
              <p className="font-bold text-zinc-500">SUBTOTAL : </p>
              <p className="font-bold">
                {moneyFormatter(checkoutSummary?.items_total)}
              </p>
            </div>
            <div className="inline-flex w-full items-start justify-between">
              <p className="font-bold text-zinc-500">SHIPPING COST : </p>
              <p
                className={cn(
                  "font-bold",
                  !isSelectedCourier &&
                    "rounded bg-red-200 px-2 font-normal text-red-500",
                )}
              >
                {!isSelectedCourier
                  ? "Please Select a Courier First."
                  : moneyFormatter(checkoutSummary?.shipping_cost)}
              </p>
            </div>
            {/* <div className="inline-flex w-full items-start justify-between">
              <p className="font-bold text-zinc-500">PPN (11%) : </p>
              <p className={cn("font-bold")}>
                {moneyFormatter(checkoutSummary?.tax.amount)}
              </p>
            </div> */}
            <div className="inline-flex w-full items-start justify-between">
              <p className="font-bold">TOTAL PAYMENT : </p>
              <p className={cn("font-bold")}>
                {moneyFormatter(checkoutSummary?.grand_total)}
              </p>
            </div>
          </div>

          <Button
            onClick={handlePay}
            disabled={isDisabled}
            className={cn(
              "bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 mt-5 w-full cursor-pointer text-lg font-bold uppercase",
              isDisabled && "cursor-not-allowed opacity-50",
            )}
          >
            {isCreating ||
              (isProcessing && (
                <Loader2 strokeWidth={1} className="animate-spin text-white" />
              ))}

            {isCreating
              ? "Preparing payment..."
              : isProcessing
                ? "Processing payment..."
                : "PAY NOW"}
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default BillingDetails;
