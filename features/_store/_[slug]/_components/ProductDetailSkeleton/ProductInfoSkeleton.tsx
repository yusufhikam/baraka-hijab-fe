const ProductInfoSkeleton = () => {
  return (
    <section className="font-geist w-full sm:flex-3">
      <div className="product-info font-krona-one w-full p-5 lg:basis-1/3 lg:p-0">
        {/* PRODUCT HEADER */}
        <section className="space-y-5">
          <div className="h-6 w-1/5 animate-pulse bg-zinc-300" />

          {/* PRODUCT NAME */}
          <div className="mb-2 h-10 w-1/2 animate-pulse bg-zinc-300" />

          {/* PRODUCT PRICE */}
          <div className="h-10 w-1/3 animate-pulse bg-zinc-300 text-xl" />
        </section>

        <hr className="my-5" />

        {/* PRODUCT DESCRIPTION */}
        <div className="font-geist mb-10 h-48 animate-pulse space-y-3 bg-zinc-300" />

        {/* PRODUCT VARIANTS INFO */}
        <div className="mb-5 h-20 animate-pulse bg-zinc-300" />

        <div className="h-10 animate-pulse bg-zinc-300" />
      </div>
    </section>
  );
};

export default ProductInfoSkeleton;
