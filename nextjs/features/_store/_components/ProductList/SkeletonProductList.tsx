import CardProduct from "@/components/common/Product/CardProduct";

export default function SkeletonProductList() {
  return (
    <>
      <div className="my-5 inline-flex w-full items-center justify-end gap-4">
        <div className="h-6 w-6 animate-pulse bg-zinc-300" />
        <div className="h-6 w-36 animate-pulse bg-zinc-300" />
      </div>
      <section className="mx-auto grid w-full grid-cols-2 items-center justify-center gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <CardProduct key={idx} variant="skeleton" className="border-none" />
        ))}
      </section>
    </>
  );
}
