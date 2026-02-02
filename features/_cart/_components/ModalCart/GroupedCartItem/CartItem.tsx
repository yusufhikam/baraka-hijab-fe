"use client";

import Image from "next/image";
import { cn, moneyFormatter, storageBaseURL } from "@/lib/utils";
import { memo, useState } from "react";
import { GroupedCartByProductType } from "@/entities/cart/types/cart.type";
import Quantity from "../../Quantity";
import { Dot, Loader2 } from "lucide-react";
import ButtonDeleteCartItem from "../../ButtonDeleteCartItem";
import useCartActions from "@/entities/cart/hooks/useCartActions";

type CartItemProps = {
  cart: GroupedCartByProductType;
};

const CartItem: React.FC<CartItemProps> = memo(({ cart }) => {
  const itemLength = cart.product_variants[0].variant_options.length;

  const { handleUpdateCart } = useCartActions();
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});
  const hasLoading = Object.values(isLoading).some(Boolean);

  const handleUpdate = async (
    product_variant_option_id: number,
    newQty: number,
  ) => {
    setIsLoading((prev) => ({
      ...prev,
      [product_variant_option_id]: true,
    }));

    try {
      await handleUpdateCart({
        product: cart.product,
        product_variant: cart.product_variants[0],
        variant_option: {
          id: product_variant_option_id,
          size: cart.product_variants[0].variant_options[0].size,
          stock: cart.product_variants[0].variant_options[0].stock,
        },
        quantity: newQty,
      });
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        [product_variant_option_id]: false,
      }));
    }
  };
  return (
    <div className="relative flex flex-col gap-2 rounded p-2 ring ring-black/30 hover:bg-zinc-200">
      <p className="absolute top-2 right-2 text-xs">
        {itemLength} {itemLength > 1 ? "items" : "item"}
      </p>

      <div className="inline-flex gap-5">
        <div className="relative">
          <Image
            src={`${storageBaseURL}/${cart.product.thumbnail}`}
            alt={cart.product.name}
            unoptimized
            width={100}
            height={100}
            className={cn(
              "aspect-square h-20 w-20 rounded object-cover sm:h-24 sm:w-24",
              hasLoading && "animate-pulse opacity-70",
            )}
          />

          {hasLoading && (
            <Loader2
              size={50}
              className="text-baraka-primary-300 absolute top-1/2 left-1/2 -translate-1/2 animate-spin"
            />
          )}
        </div>

        <div className="inline-flex flex-col justify-between">
          <p className="text-xl">{cart.product.name}</p>

          <p className="text-xl font-semibold">
            {moneyFormatter(cart.product.price)} / item
          </p>
        </div>
      </div>

      <div className="">
        <p className="font-semibold text-zinc-500">Variant:</p>
        {cart.product_variants.map((variant, idx) => (
          <div key={idx} className="space-y-2 px-2">
            <div className="inline-flex items-center gap-4">
              <p className="font-semibold">Color : </p>
              <div
                style={{ backgroundColor: variant.color }}
                className="h-5 w-5 rounded-full"
              />
            </div>

            <div>
              <p className="font-semibold">Size</p>

              <div className="flex w-full flex-col gap-2">
                {variant.variant_options.map((option, idx) => (
                  <div key={idx} className="inline-flex w-full justify-between">
                    <p className="inline-flex items-center">
                      <span>
                        <Dot />
                      </span>
                      {option.size}
                    </p>

                    <div className="inline-flex items-center gap-3">
                      <Quantity
                        isLoading={isLoading[option.id] || false}
                        value={option.quantity}
                        onChange={(newQty) => handleUpdate(option.id, newQty)}
                      />
                      <hr className="h-1/2 w-1 border-r border-r-black/60" />

                      {/* BUTTON DELETE CART */}
                      <ButtonDeleteCartItem
                        product_variant_option_id={option.id}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

CartItem.displayName = "CartItem";

export default CartItem;
