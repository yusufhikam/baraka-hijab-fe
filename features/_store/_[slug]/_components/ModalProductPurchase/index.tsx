"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductType } from "@/entities/product/types/product.type";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Quantity from "../../../../_cart/_components/Quantity";
import { Loader2 } from "lucide-react";
import ProductPurchaseInfo from "./ProductPurchaseInfo";
import ProductPurchaseSelectVariantColor from "./ProductPurchaseSelectVariantColor";
import ProductPurchaseSelectVariantSize from "./ProductPurchaseSelectVariantSize";
import useAddToCartController from "../../../../../entities/cart/hooks/useAddToCartController";
import useProductPurchaseState from "@/hooks/useProductPurchaseState";
import useBuyNowController from "@/entities/checkout/hooks/useBuyNowController";

type ModalAddToCartProps = {
  product: ProductType;
  mode?: "buy" | "cart";
  className?: string;
};

export default function ModalProductPurchase({
  product,
  mode = "cart",
  className,
}: ModalAddToCartProps) {
  const purchase = useProductPurchaseState(product);

  const { submit: handleAddToCart, isAddingLoading } = useAddToCartController(
    product,
    purchase,
  );

  const { submitBuyNow: handleBuyNow, isBuyingLoading } =
    useBuyNowController(purchase);

  const isLoading = mode === "cart" ? isAddingLoading : isBuyingLoading;

  const handleOnSubmit = mode === "cart" ? handleAddToCart : handleBuyNow;

  return (
    <Dialog open={purchase.openModal} onOpenChange={purchase.onChangeOpenModal}>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className={cn(
            "bg-baraka-lightgreen-200 mt-10 w-full cursor-pointer rounded-none py-2 text-white",
            mode === "buy" && "bg-black",
            className,
          )}
        >
          {mode === "cart" ? "Add to Cart" : "Buy Now"}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "data-[state=open]:backdrop-blur-lg",
          purchase.openModal && "backdrop-blur-lg",
        )}
      >
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>

        <section className="">
          <ProductPurchaseInfo
            product={product}
            displayStock={purchase.displayStock}
          />

          <section className="mt-2 flex flex-col gap-5">
            <ProductPurchaseSelectVariantColor
              product={product}
              selectColor={purchase.selectVariantColor}
              setSelectColor={purchase.setSelectVariantColor}
            />

            <ProductPurchaseSelectVariantSize
              product={product}
              selectVariantColor={purchase.selectVariantColor}
              selectedVariantOptionId={purchase.selectedVariantOptionId}
              handleClickSize={purchase.handleSelectVariantOptionSize}
            />

            <form onSubmit={handleOnSubmit} className="space-y-5">
              {purchase.selectedVariantOptionId !== null && (
                <div className="inline-flex w-full items-center justify-between">
                  <h3>Quantity</h3>
                  <Quantity
                    value={purchase.quantity}
                    onChange={purchase.setQuantity}
                  />
                </div>
              )}

              <Button
                type="submit"
                className="bg-baraka-lightgreen-200 mt-2 w-full"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : mode === "cart" ? (
                  "Add To Cart"
                ) : (
                  "Buy Now"
                )}
              </Button>
            </form>
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
}
