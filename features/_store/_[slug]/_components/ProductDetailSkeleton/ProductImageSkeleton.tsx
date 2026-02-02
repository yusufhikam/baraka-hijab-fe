const ProductImageSkeleton = () => {
  return (
    <section className="flex h-[60dvh] w-full grid-cols-6 flex-col justify-center gap-4 overflow-hidden sm:h-[80dvh] sm:flex-4 lg:grid lg:flex-row">
      <section className="main_image col-span-5 h-full">
        {/* animated */}
        <div className="aspect-video h-full w-full animate-pulse bg-zinc-300" />
      </section>

      <div>
        <div className="-ml-1 flex flex-row gap-4 lg:ml-0 lg:max-h-[600px] lg:flex-col">
          {[1, 2, 3].map((_, idx) => (
            //
            <div
              key={idx}
              className="list_image aspect-square h-28 w-full animate-pulse bg-zinc-300 pl-1 lg:pl-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductImageSkeleton;
