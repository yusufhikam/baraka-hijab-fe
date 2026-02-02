import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import checkoutApi from "../api/checkoutApi";
import { toast } from "sonner";
import { CheckoutPreparePayloadType } from "../types/checkout-prepare.type";
import { CheckoutSetShippingPayloadType } from "../types/checkout-setShipping.type";

type UseCheckoutQueryProps = {
  isCheckoutPage?: boolean;
};

// ? props of isCheckoutPage is used to get checkout summary,
// ? only if this hook called on checkout page that's showing checkout summary info

export default function useCheckoutQuery({
  isCheckoutPage = false,
}: UseCheckoutQueryProps = {}) {
  const queryClient = useQueryClient();

  // todo : get checkout summary
  const { data: checkoutSummary, isLoading: isLoadingSummary } = useQuery({
    queryKey: ["checkout_summary"],
    queryFn: () => checkoutApi.checkoutSummary(),
    // staleTime: 60 * 1000 * 10, //for 10 minutes
    enabled: !!isCheckoutPage,
  });

  // todo : mutate for checkout prepare
  const mutateCheckoutPrepare = useMutation({
    mutationFn: (payload: CheckoutPreparePayloadType) =>
      checkoutApi.checkoutPrepare(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout_summary"] });
    },
    onError: (err) => {
      const error = err.message;
      console.error("🚀 ~ useCheckoutQuery ~ error:", error);
      toast.error("Failed to create checkout.", {
        description: error,
        duration: 1000,
        position: "top-right",
      });
    },
  });

  // todo : mutate for set shipping for get shipping cost after CHECKOUT PREPARE
  const mutateSetShipping = useMutation({
    mutationFn: (payload: CheckoutSetShippingPayloadType) =>
      checkoutApi.checkoutSetShipping(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout_summary"] });
    },
    onError: (err) => {
      const error = err.message;
      console.error("🚀 ~ useCheckoutQuery ~ error:", error);
      toast.error("Failed to set shipping.", {
        description: error,
        duration: 1000,
        position: "top-right",
      });
    },
  });

  //   todo : mutate for checkout create transaction
  // next check for snap midtrans
  const mutateCheckoutTransaction = useMutation({
    mutationFn: (address_id: number) => checkoutApi.checkout({ address_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err) => {
      const error = err.message;
      console.error("🚀 ~ useCheckoutQuery ~ error:", error);
      toast.error("Failed to create checkout.", {
        description: error,
        duration: 1000,
        position: "top-right",
      });
    },
  });

  return {
    mutateCheckoutPrepare,
    mutateSetShipping,
    checkoutSummary,
    isLoadingSummary,
    mutateCheckoutTransaction,
  };
}
