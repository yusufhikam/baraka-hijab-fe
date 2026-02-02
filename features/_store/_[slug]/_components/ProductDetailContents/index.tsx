"use client";

import { ProductType } from "@/entities/product/types/product.type";
import dynamic from "next/dynamic";
import { useState } from "react";
import ProductImageSkeleton from "../ProductDetailSkeleton/ProductImageSkeleton";
import ProductInfoSkeleton from "../ProductDetailSkeleton/ProductInfoSkeleton";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

// const ProductImages = dynamic(() => import("./ProductImages/"), {
//   ssr: false,
//   loading: () => <ProductImageSkeleton />,
// });
// const ProductInfo = dynamic(() => import("./ProductInfo"), {
//   ssr: false,
//   loading: () => <ProductInfoSkeleton />,
// });

type ProductDetailContentsProps = {
  product: ProductType;
};
const ProductDetailContents: React.FC<ProductDetailContentsProps> = ({
  product,
}) => {
  const defaultVariant = product.product_variants[0];
  const defaultPhoto = defaultVariant.photos[0].photo;

  const [activeVariantId, setActiveVariantId] = useState(defaultVariant.id);
  const [activeMainPhoto, setActiveMainPhoto] = useState(defaultPhoto);

  const handleVariantChange = (variantId: number) => {
    const variant = product.product_variants.find((v) => v.id === variantId);
    if (!variant) return;

    setActiveVariantId(variantId);
    setActiveMainPhoto(variant.photos[0].photo); // reset to first photo
  };

  return (
    <>
      <ProductImages
        product={product}
        activeVariantId={activeVariantId}
        activeMainPhoto={activeMainPhoto}
        onChangeMainPhoto={setActiveMainPhoto}
      />
      <ProductInfo
        product={product}
        activeVariantId={activeVariantId}
        onChangeVariant={handleVariantChange}
      />
    </>
  );
};

export default ProductDetailContents;
