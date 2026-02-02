import findProductVariantAndOptions from "@/entities/cart/utils/findVariant";
import { ProductType } from "@/entities/product/types/product.type";
import { useMemo, useState } from "react";

export default function useSelectedProductVariantOption(product: ProductType) {
  const [selectedVariantOptionId, setSelectedVariantOptionId] = useState<
    number | null
  >(null);

  const [selectVariantColor, setSelectVariantColor] = useState<number>(0);

  // handle select variant option id
  //   if selected SIZE will display Quantity component
  const handleSelectVariantOptionSize = (variantOptionId: number) => {
    setSelectedVariantOptionId(variantOptionId);
  };

  // find variant and option by selected variant option id
  const variants = product.product_variants;

  // find variant and option
  const { variant, option } = useMemo(() => {
    return findProductVariantAndOptions(variants, selectedVariantOptionId);
  }, [variants, selectedVariantOptionId]);

  return {
    selectedVariantOptionId,
    selectVariantColor,
    setSelectVariantColor,
    handleSelectVariantOptionSize,
    setSelectedVariantOptionId,
    variant,
    option,
  };
}
