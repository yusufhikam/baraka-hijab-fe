"use client";

import GroupedCartItems from "../ModalCart/GroupedCartItem";
import useUserCart from "@/entities/cart/hooks/useUserCart";
import CartSkeleton from "./CartSkeleton";
import EmptyCart from "../ModalCart/EmptyCart";
import { Handbag } from "lucide-react";
import { memo } from "react";

const CartList = () => {
  const { carts, totalItems, isLoadingCart } = useUserCart();

  if (isLoadingCart) return <CartSkeleton />;

  if (totalItems === 0)
    return (
      <section className="bg-baraka-lightgreen-200/20 ring-baraka-lightgreen-200 mt-10 flex h-[50dvh] w-full items-center rounded ring">
        <EmptyCart />
      </section>
    );

  return (
    <section className="mt-10 w-full">
      {totalItems && (
        <div className="inline-flex gap-4 border-b border-black pb-2">
          <Handbag />
          <h2>
            <b>{totalItems}</b> {totalItems > 1 ? "items" : "item"} in your
            cart.
          </h2>
        </div>
      )}

      <section className="mt-10 flex w-full flex-col items-center justify-between gap-5 md:flex-row md:items-start">
        <GroupedCartItems carts={carts} displayCartItemInfo />
      </section>
    </section>
  );
};

export default memo(CartList);
