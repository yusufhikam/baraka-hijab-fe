"use client";

import { Card } from "@/components/ui/card";
import { ProductType } from "@/entities/product/types/product.type";
import { cn } from "@/lib/utils";
import CardProductContent from "./CardProductContent";
import CardProductHeader from "./CardProductHeader";
import { useRouter } from "next/navigation";
// import ModalQuickView from "../ModalQuickView";
import { Activity, useRef } from "react";
import ButtonAddToWishList from "../../ButtonAddToWishList";
import dynamic from "next/dynamic";

const ModalQuickView = dynamic(
  () => import("@/components/common/Product/ModalQuickView"),
  { ssr: false },
);

export type CardProductProps = {
  className?: string;
  product?: ProductType;
  variant?: "fetch" | "skeleton";
  displayModalQuickView?: boolean;
};
export default function CardProduct({
  className,
  product,
  variant = "fetch",
  displayModalQuickView = false,
}: CardProductProps) {
  const router = useRouter();
  const modalQuickViewRef = useRef<HTMLButtonElement>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (
      modalQuickViewRef.current?.contains(e.target as Node) ||
      variant === "skeleton"
    ) {
      return;
    }
    router.push(`/store/${product?.slug}`);
  };
  return (
    <Card
      // onClick={handleCardClick}
      title={product?.slug}
      className={cn(
        "group relative aspect-3/4 w-full max-w-xs cursor-pointer gap-0 overflow-hidden rounded-none border border-black p-0",
        className,
      )}
    >
      <CardProductHeader
        onClick={handleCardClick}
        product={product}
        variant={variant}
      />

      <CardProductContent product={product} variant={variant} />

      <Activity mode={variant === "skeleton" ? "hidden" : "visible"}>
        <ButtonAddToWishList
          // variant={"destructive"}
          className="absolute top-5 right-5 size-10 origin-center scale-0 rounded-full text-white backdrop-blur-lg transition-transform duration-300 ease-in-out group-hover:scale-100 active:scale-75"
        />
      </Activity>

      {displayModalQuickView && (
        <ModalQuickView
          ref={modalQuickViewRef}
          product={product}
          triggerClassName="absolute z-4 group-hover:bottom-11 group-hover:sm:bottom-15  transition-all duration-300 ease-in bottom-10 opacity-0 group-hover:opacity-100 w-full "
        />
      )}
    </Card>
  );
}
