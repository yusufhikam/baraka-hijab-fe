import CardProduct from "@/components/common/Product/CardProduct";

export default function NewArrivalProductSkeleton() {
  return [1, 2, 3].map((id) => <CardProduct key={id} variant="skeleton" />);
}
