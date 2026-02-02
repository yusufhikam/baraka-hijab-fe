import { ProductType } from "@/entities/product/types/product.type";
import useSelectedProductVariantOption from "./useSelectedProductVariantOption";
import { useCallback, useState } from "react";

export default function useProductPurchaseState(product: ProductType) {
  const [quantity, setQuantity] = useState<number>(1);
  const [openModal, setOpenModal] = useState(false);

  const {
    variant,
    option,
    handleSelectVariantOptionSize,
    selectedVariantOptionId,
    setSelectedVariantOptionId,
    setSelectVariantColor,
    selectVariantColor,
  } = useSelectedProductVariantOption(product);

  // set default stock => BE response for sum all variant stock
  const defaultStock = product.variant_stock;

  // displaying stock by selected variant
  const displayStock = option ? option.stock : defaultStock;

  // reset state
  const resetState = useCallback(() => {
    setQuantity(1);
    setSelectVariantColor(0);
    setSelectedVariantOptionId(null);
  }, [setSelectVariantColor, setSelectedVariantOptionId]);

  // function for onChange of Dialog Component
  const onChangeOpenModal = useCallback(
    (open: boolean) => {
      setOpenModal(open);
      if (!open) resetState();
    },
    [resetState],
  );

  return {
    quantity,
    setQuantity,
    variant,
    displayStock,
    resetState,
    option,
    openModal,
    setOpenModal,

    handleSelectVariantOptionSize,
    selectedVariantOptionId,
    selectVariantColor,
    setSelectVariantColor,
    onChangeOpenModal,
  };
}
