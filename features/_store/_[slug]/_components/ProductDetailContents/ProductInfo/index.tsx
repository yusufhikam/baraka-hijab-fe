import { ProductType } from "@/entities/product/types/product.type";
import ProductVariantInfo from "./ProductVariantInfo";
import ModalProductPurchase from "../../ModalProductPurchase";
import ProductCategoryInfoLinks from "./ProductCategoryInfoLinks";
import { moneyFormatter } from "@/lib/utils";

type ProductInfoProps = {
  product: ProductType;
  activeVariantId: number;
  onChangeVariant: (variantId: number) => void;
};

export default function ProductInfo({
  product,
  activeVariantId,
  onChangeVariant,
}: ProductInfoProps) {
  return (
    <section className="font-geist border-black sm:flex-3">
      <div className="product-info font-krona-one w-full p-5 lg:basis-1/3 lg:p-0">
        {/* PRODUCT HEADER */}
        <section className="space-y-5">
          <ProductCategoryInfoLinks product={product} />

          {/* PRODUCT NAME */}
          <h1 className="mb-2 text-2xl capitalize">{product.name}</h1>

          {/* PRODUCT PRICE */}
          <p className="text-xl">{moneyFormatter(product.price)}</p>
        </section>
        <hr className="my-5" />

        {/* PRODUCT DESCRIPTION */}
        <div className="font-geist space-y-3">
          <p className="font-bold">Description</p>

          <div
            className="text-justify indent-8"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* <p className="text-justify indent-8">{product.description}</p> */}
        </div>

        {/* PRODUCT VARIANTS INFO */}
        <ProductVariantInfo
          product={product}
          activeVariantId={activeVariantId}
          onChangeVariant={onChangeVariant}
        />

        {/* {quantityError && (
          <QuantityErrorMessage quantityError={quantityError} />
        )} */}

        <div className="mt-10 flex w-full flex-col items-center gap-4 overflow-hidden sm:flex-row sm:justify-end">
          <ModalProductPurchase
            product={product}
            mode="buy"
            className="mt-0 sm:basis-2/5"
          />

          <ModalProductPurchase
            product={product}
            className="mt-0 sm:basis-2/5"
          />
        </div>
      </div>
    </section>
  );
}
