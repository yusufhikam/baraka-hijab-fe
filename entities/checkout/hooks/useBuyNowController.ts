import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useCheckoutQuery from "./useCheckoutQuery";
import useProductPurchaseState from "@/hooks/useProductPurchaseState";
import { useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function useBuyNowController(
  purchase: ReturnType<typeof useProductPurchaseState>,
) {
  const router = useRouter();

  const { mutateCheckoutPrepare } = useCheckoutQuery();
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const redirectUrl = `${pathname}?${searchParams.toString()}`;

  const submitBuyNow = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isAuthenticated) {
        toast.info("Please Login First", {
          duration: 3000,
          position: "top-right",
          onAutoClose: () => {
            router.push(
              `/auth/login?redirect=${encodeURIComponent(redirectUrl)}`,
            );
          },
          // richColors: true,
        });
        return;
      }

      if (!purchase.option || !purchase.variant) {
        toast.info("Please Select Variant Size", {
          duration: 3000,
          position: "top-right",
          // richColors: true,
        });

        return;
      }

      mutateCheckoutPrepare.mutate(
        {
          source: "buy_now",
          items: [
            {
              product_variant_option_id: purchase.option.id,
              quantity: purchase.quantity,
            },
          ],
        },
        {
          onSuccess: () => {
            router.push("/checkout");
          },
        },
      );
    },
    [mutateCheckoutPrepare, purchase, router, isAuthenticated, redirectUrl],
  );

  return {
    submitBuyNow,
    isBuyingLoading: mutateCheckoutPrepare.isPending,
  };
}
