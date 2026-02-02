import { Button } from "@/components/ui/button";
import { ProductType } from "@/entities/product/types/product.type";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

type ProductPurchaseSelectVariantSizeProps = {
  product: ProductType;
  selectVariantColor: number;
  selectedVariantOptionId: number | null;
  handleClickSize: (variantId: number, stock: number) => void;
};

const ProductPurchaseSelectVariantSize: React.FC<
  ProductPurchaseSelectVariantSizeProps
> = ({
  product,
  selectVariantColor,
  selectedVariantOptionId,
  handleClickSize,
}) => {
  const variants = product.product_variants;

  return (
    <div className="space-y-2">
      {variants.map(
        (variant, idx) =>
          selectVariantColor === idx && (
            <Fragment key={idx}>
              <p>Select variant size</p>

              <div className="space-x-2">
                {variant.variant_options.map((option, i) => (
                  <Button
                    key={i}
                    // onClick={() => handleSelectVariantOptionSize(option.id)}
                    onClick={() => handleClickSize(option.id, option.stock)}
                    variant={"outline"}
                    size={"icon-lg"}
                    className={cn(
                      "p-1.5 break-all whitespace-normal",
                      selectedVariantOptionId === option.id &&
                        "ring ring-black ring-offset-2",
                    )}
                  >
                    {option.size}
                  </Button>
                ))}
              </div>
            </Fragment>
          ),
      )}
    </div>
  );
};

export default ProductPurchaseSelectVariantSize;
