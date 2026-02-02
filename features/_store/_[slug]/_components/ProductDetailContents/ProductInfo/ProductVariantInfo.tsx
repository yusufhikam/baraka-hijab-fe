import { ProductType } from "@/entities/product/types/product.type";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";

type ProductVariantInfoProps = {
  product: ProductType;
  activeVariantId: number;
  onChangeVariant: (variantId: number) => void;
};

export default function ProductVariantInfo({
  product,
  activeVariantId,
  onChangeVariant,
}: ProductVariantInfoProps) {
  return (
    <section className="font-geist mt-5">
      <p className="mb-2 font-semibold">Variant Options :</p>

      <div className="grid grid-cols-2 gap-x-2 gap-y-5">
        <p>Color</p>
        <p>Size</p>

        {product.product_variants.map((variant, idx) => (
          <Fragment key={idx}>
            <Button
              type="button"
              onClick={() => onChangeVariant(variant.id)}
              style={{
                backgroundColor: variant.color,
                // width: "1rem",
                // height: "1rem",
                // borderRadius: "100%",
                outline:
                  activeVariantId === variant.id ? "2px solid black" : "none",
                outlineOffset: "2px",
              }}
              variant={"ghost"}
              size={"icon"}
            />

            <div className="flex gap-2">
              {variant.variant_options.map((option, i) => (
                <p key={i} className="inline-flex items-center">
                  <Dot /> {option.size}
                </p>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
