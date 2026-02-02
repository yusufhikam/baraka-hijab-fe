import { ProductVariantType } from "@/entities/product/types/productVariant.type";

/**
 *
 * * Find variant option in selected product variants by option id
 *
 * @param variants
 * @param optionId
 * @returns
 */
const findProductVariantAndOptions = (
  variants: ProductVariantType[],
  optionId: number | null,
) => {
  for (const variant of variants) {
    const option = variant.variant_options.find((opt) => opt.id === optionId);
    if (option) {
      return { variant, option };
    }
  }

  return { variant: null, option: null };
};

export default findProductVariantAndOptions;
