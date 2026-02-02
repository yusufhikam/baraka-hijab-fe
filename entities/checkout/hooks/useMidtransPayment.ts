"use client";
import useMidtransScript from "@/hooks/useMidtransScript";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
// type MidtransPaymentType = {
//   onSuccessCallback?: (result: any, order_id?: string) => void;
//   onErrorCallback?: (error: any) => void;
//   onCloseCallback?: () => void;
// };

export default function useMidtransPayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  // const { isLoaded: isSnapLoaded } = useMidtransScript();

  const initiatePayment = useCallback(
    (snapToken: string, order_id?: string) => {
      // if (!isSnapLoaded) {
      //   return Promise.reject(new Error("Loading snap. Please wait."));
      // }

      if (!window.snap) {
        // onErrorCallback?.(new Error("Snap not loaded"));
        return Promise.reject(new Error("Snap not ready yet."));
      }

      setIsProcessing(true);

      return new Promise<void>((resolve, reject) => {
        window.snap.pay(snapToken, {
          onSuccess: (result) => {
            setIsProcessing(false);
            // onSuccessCallback?.(result, order_id);

            router.replace(`/checkout/success?order_id=${order_id}`);
            toast.success("Payment Successfull", {
              position: "top-right",
              richColors: true,
              onAutoClose: () => {
                router.replace(`/checkout/success?order_id=${order_id}`);
                queryClient.invalidateQueries({ queryKey: ["transactions"] });
              },
            });
            resolve();
          },
          onError: (result) => {
            setIsProcessing(false);
            // onErrorCallback?.(result);

            console.error("🚀 ~ BillingDetails ~ error:", result);
            toast.error("Payment failed. Please try again.", {
              position: "top-right",
              richColors: true,
            });

            router.replace("/user/transactions");

            reject(result);
          },
          onClose: () => {
            setIsProcessing(false);
            // onCloseCallback?.();

            toast.info(
              "Payment not completed. You can continue payment in your transaction page.",
              {
                position: "top-right",
              },
            );

            router.replace("/user/transactions");
            // reject(new Error("You're closing the payment pop up"));
          },
        });
      });
    },
    [router, queryClient],
  );

  return { initiatePayment, isProcessing };
}
