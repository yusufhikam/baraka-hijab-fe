import CardProduct from "@/components/common/Product/CardProduct";

export default function SimilarProductSkeleton() {
  return (
    <div className="mt-20 flex w-full flex-nowrap items-center gap-5">
      {Array.from({ length: 4 }).map((_, idx) => (
        <CardProduct key={idx} variant="skeleton" className="shrink-0 grow-0" />
      ))}
    </div>
  );
}
