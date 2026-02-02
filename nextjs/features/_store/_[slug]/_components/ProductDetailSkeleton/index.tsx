import ProductImageSkeleton from "./ProductImageSkeleton";
import ProductInfoSkeleton from "./ProductInfoSkeleton";

const ProductDetailSkeleton = () => {
  return (
    <section className="mt-5 flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:gap-10">
      {/* LEFT SECTION */}
      <ProductImageSkeleton />

      {/* RIGHT SECTION */}

      <ProductInfoSkeleton />
    </section>
  );
};

export default ProductDetailSkeleton;
