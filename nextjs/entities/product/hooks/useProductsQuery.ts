import { useQuery } from "@tanstack/react-query";
import productApi from "../api/productApi";
import { ProductType } from "../types/product.type";

type UseDetailProductQueryProps = {
  product?: Pick<ProductType, "id" | "slug">;
  openModal?: boolean;
};

export default function useDetailProductQuery({
  product,
  openModal,
}: UseDetailProductQueryProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-product", product?.id],
    queryFn: () => productApi.getDetailProduct(product?.slug as string),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: openModal === true && product?.slug !== undefined,
  });

  return { data, isLoading };
}
