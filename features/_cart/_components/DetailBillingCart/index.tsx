"use client";

import { Button } from "@/components/ui/button";
import { GuestCartPayloadType } from "@/entities/cart/types/cart.type";
import useCheckoutQuery from "@/entities/checkout/hooks/useCheckoutQuery";
import { cn, moneyFormatter } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type DetailBillingCartProps = {
  carts: GuestCartPayloadType[];
  subTotal: number;
  showItemDetails?: boolean;
  className?: string;
};

export default function DetailBillingCart({
  carts,
  subTotal,
  showItemDetails = false,
  className,
}: DetailBillingCartProps) {
  const router = useRouter();
  const { mutateCheckoutPrepare } = useCheckoutQuery({
    isCheckoutPage: false,
  });

  const isLoading = mutateCheckoutPrepare.isPending;

  const handleCartPrepareCheckout = () => {
    mutateCheckoutPrepare.mutate(
      { source: "cart", items: [] },
      {
        onSuccess: () => {
          router.push("/checkout");
        },
      },
    );
  };

  return (
    <section
      className={cn(
        "mt-5 w-full flex-1 basis-1/3 space-y-5",
        className,
        showItemDetails && "md:sticky md:top-20",
      )}
    >
      {showItemDetails && (
        <div className="space-y-4 text-sm md:text-xs lg:text-sm">
          {carts.map((item, idx) => (
            <div
              className="flex justify-between gap-1 border-b border-b-black/30 pb-2 uppercase"
              key={idx}
            >
              <div className="">
                <p>{item.product.name}</p>

                <div className="inline-flex items-center gap-2">
                  <div
                    style={{ backgroundColor: item.product_variant.color }}
                    className="size-2 rounded-full"
                  />{" "}
                  / <p className="text-[10px]">{item.variant_option.size} </p>
                </div>
              </div>
              <p>
                {moneyFormatter(item.product.price)} <b> x {item.quantity}</b>
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="inline-flex w-full items-center justify-between">
        <p className="font-semibold text-zinc-500">SUBTOTAL : </p>
        <p className="font-bold">{moneyFormatter(subTotal)}</p>
      </div>

      <div className="font-geist mt-5 inline-flex w-full flex-col items-center justify-center gap-2 uppercase">
        <Button
          disabled={isLoading}
          size={"lg"}
          className={cn(
            "bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 w-full cursor-pointer rounded-xs font-bold uppercase",
            isLoading && "animate-pulse cursor-wait",
          )}
          onClick={handleCartPrepareCheckout}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : showItemDetails ? (
            "Proceed to Checkout"
          ) : (
            "Checkout"
          )}
        </Button>

        {!showItemDetails && (
          <Button
            asChild
            size={"lg"}
            variant={"outline"}
            className="hover:bg-baraka-lightgreen-200 border-baraka-lightgreen-200 w-full rounded-xs border font-bold hover:text-white"
          >
            <Link href={"/carts"}>View Cart Page</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
