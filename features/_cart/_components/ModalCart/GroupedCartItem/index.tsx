"use client";

import {
  GroupedCartByProductType,
  GuestCartPayloadType,
} from "@/entities/cart/types/cart.type";
import { Activity, useMemo } from "react";
import CartItem from "./CartItem";
import { cn } from "@/lib/utils";
import DetailBillingCart from "../../DetailBillingCart";
import { DrawerFooter } from "@/components/ui/drawer";

type GroupedCartByProductProps = {
  carts: GuestCartPayloadType[];
  displayCartItemInfo?: boolean;
  variant?: "drawer" | "popover" | "default";
  className?: string;
};

export default function GroupedCartItems({
  carts,
  displayCartItemInfo = false,
  variant = "default",
  className,
}: GroupedCartByProductProps) {
  const filteredItemsByProduct = useMemo(() => {
    if (!carts || carts.length === 0) return [];

    const grouped: Record<number | string, GroupedCartByProductType> = {};

    for (const cart of carts) {
      const GROUP_KEY = `${cart.product.id}-${cart.product_variant.color}`;

      if (!grouped[GROUP_KEY]) {
        grouped[GROUP_KEY] = {
          product: cart.product,
          product_variants: [
            {
              id: cart.product_variant.id,
              name: cart.product_variant.name,
              color: cart.product_variant.color,
              weight: cart.product_variant.weight,
              variant_options: [],
            },
          ],
          total_quantity: 0,
        };
      }

      const EXISTING_VARIANT = grouped[GROUP_KEY].product_variants[0];

      EXISTING_VARIANT.variant_options.push({
        id: cart.variant_option.id,
        size: cart.variant_option.size,
        stock: cart.variant_option.stock,
        quantity: cart.quantity,
      });
      grouped[GROUP_KEY].total_quantity += cart.quantity;
    }

    return Object.values(grouped);
  }, [carts]);

  const subTotal = useMemo(() => {
    return filteredItemsByProduct.reduce((acc, item) => {
      const itemPrice = item.product.price;
      return acc + item.total_quantity * itemPrice;
    }, 0);
  }, [filteredItemsByProduct]);

  return (
    <>
      <div
        className={cn(
          "w-full flex-1 basis-1/2 space-y-5",
          displayCartItemInfo &&
            "max-h-[500px] overflow-hidden overflow-y-auto p-1 sm:max-h-none",
          className,
        )}
      >
        {filteredItemsByProduct.map((cart, idx) => (
          <CartItem key={idx} cart={cart} />
        ))}
      </div>

      <Activity
        mode={
          variant === "default" || variant === "popover" ? "visible" : "hidden"
        }
      >
        <DetailBillingCart
          carts={carts}
          subTotal={subTotal}
          showItemDetails={displayCartItemInfo}
        />
      </Activity>

      <Activity mode={variant === "drawer" ? "visible" : "hidden"}>
        <DrawerFooter className="sticky bottom-0 w-full bg-white">
          <DetailBillingCart
            carts={carts}
            subTotal={subTotal}
            showItemDetails={displayCartItemInfo}
            className="flex-none basis-full bg-white"
          />
        </DrawerFooter>
      </Activity>
    </>
  );
}
