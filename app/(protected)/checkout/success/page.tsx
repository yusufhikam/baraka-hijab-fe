"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useValidateTransasctionQuery from "@/entities/transactions/hooks/useValidateTransaction";
import CheckoutSuccessSkeleton from "@/features/_checkout/_components/CheckoutSuccessSkeleton";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { toast } from "sonner";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const order_id = searchParams.get("order_id");

  const { data, isLoading, isError, isSuccess } = useValidateTransasctionQuery({
    order_id,
  });

  useLayoutEffect(() => {
    if (!order_id) {
      toast.error("Invalid to access page.", { position: "top-right" });
      router.replace("/");
      return;
    }

    if (isError) {
      toast.error("Failed to validate transaction.", { position: "top-right" });
      router.replace("/");
    }

    if (isSuccess && data.status === false) {
      toast.info("Transaction not found or not paid.", {
        position: "top-right",
      });

      router.replace("/user/transactions");
    }
  }, [router, order_id, data, isSuccess, isError]);

  if (isLoading) {
    return <CheckoutSuccessSkeleton />;
  }

  if (isSuccess && data.status === true) {
    return (
      <main className="container-fluid mx-auto flex min-h-dvh items-baseline justify-center bg-zinc-300">
        <Card className="m-auto max-w-2xl rounded-sm">
          <CardContent>
            <div className="space-y-6">
              <div className="relative">
                <Check
                  size={50}
                  className="bg-baraka-primary-300 relative z-5 mx-auto rounded-full p-1.5 text-white"
                />
                <div className="bg-baraka-primary-400 absolute inset-1/2 z-1 size-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full" />
              </div>

              <div className="font-geist space-y-2 text-center">
                <h1 className="text-4xl">Thank you for your purchase !</h1>
                <p>
                  We&apos;ve receive your order. Please wait for the shipment or
                  track your order.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-10 flex items-center justify-center gap-5">
            <Button
              className="bg-baraka-primary-300 uppercase"
              onClick={() => router.replace("/user/transactions")}
            >
              Track your orders
            </Button>
            <Button
              variant={"outline"}
              className="uppercase"
              onClick={() => router.replace("/")}
            >
              Back to Homepage
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  // fallback return
  return null;
}
