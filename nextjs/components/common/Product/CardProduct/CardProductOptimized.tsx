"use client";

import { CardProductProps } from "@/components/common/Product/CardProduct";
import dynamic from "next/dynamic";

const CardProduct = dynamic(
  () => import("@/components/common/Product/CardProduct"),
  { ssr: false, loading: () => <CardProduct variant="skeleton" /> },
);

export default function CardProductOptimized({
  product,
  className,
  displayModalQuickView,
  variant,
}: CardProductProps) {
  return (
    <CardProduct
      product={product}
      className={className}
      displayModalQuickView={displayModalQuickView}
      variant={variant}
    />
  );
}
