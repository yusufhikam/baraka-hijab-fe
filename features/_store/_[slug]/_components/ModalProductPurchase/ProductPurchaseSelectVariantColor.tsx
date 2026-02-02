import { Button } from "@/components/ui/button";
import { ProductType } from "@/entities/product/types/product.type";
import { groupVariantByColors } from "@/features/_store/_[slug]/utils/generateGroupVariantsByColor";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

type ProductPurchaseSelectVariantColorProps = {
  product: ProductType;
  selectColor: number;
  setSelectColor: (idx: number) => void;
};

const ProductPurchaseSelectVariantColor: React.FC<
  ProductPurchaseSelectVariantColorProps
> = ({ product, selectColor, setSelectColor }) => {
  // grouping product variants by color
  const groupedVariants = groupVariantByColors(product.product_variants);

  // const { setSelectVariantColor, selectVariantColor } =
  //   useSelectedProductVariantOption(product);
  return (
    <div className="space-y-2 space-x-2">
      <h3>Select variant color</h3>
      {groupedVariants.map(({ color }, idx) => (
        <Fragment key={idx}>
          <Button
            onClick={() => setSelectColor(idx)}
            style={{ backgroundColor: color }}
            size={"icon-lg"}
            className={cn(
              "cursor-pointer",
              idx === selectColor && "ring ring-black ring-offset-2",
            )}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default ProductPurchaseSelectVariantColor;
