// grouping variant by colors

import { ProductVariantType } from "@/entities/product/types/productVariant.type";

type GroupedVariants = {
  color: string;
  variants: ProductVariantType[];
};

// if color is same, group sizes into array
export const groupVariantByColors = (
  variants: ProductVariantType[],
): GroupedVariants[] => {
  // output : {[color: string, variants: ProductVariantType[]]}

  const groups = variants.reduce(
    (acc, variant) => {
      // if color not exist, create new array
      if (!acc[variant.color]) {
        acc[variant.color] = [];
      }
      //   push all objects to array
      acc[variant.color].push(variant);
      return acc;
    },
    {} as Record<string, ProductVariantType[]>,
  );

  return Object.entries(groups).map(([color, variants]) => ({
    color,
    variants,
  }));
};
