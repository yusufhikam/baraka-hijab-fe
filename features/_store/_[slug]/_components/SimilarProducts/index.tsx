import { ProductType } from "@/entities/product/types/product.type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import CardProduct from "@/components/common/Product/CardProduct";
import { use } from "react";
import { ApiResponse } from "@/types/apiResponse.type";
import CardProductOptimized from "@/components/common/Product/CardProduct/CardProductOptimized";

type SimilarProductsProps = {
  product: Promise<ApiResponse<ProductType[]>>;
};

const SimilarProducts: React.FC<SimilarProductsProps> = ({ product }) => {
  const productData = use(product);
  const similarProducts = productData.data ? productData.data : [];

  if (!similarProducts.length) return null;

  return (
    <Carousel className="relative mt-40" opts={{ align: "start" }}>
      <CarouselContent className="sm:-ml-10 sm:px-5">
        {similarProducts.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-xs pl-10 sm:basis-sm xl:basis-1/4"
          >
            <CardProductOptimized product={product} displayModalQuickView />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        size={"icon-lg"}
        className="hover:bg-baraka-primary-300 -top-10 left-3/4 -translate-x-1/2 rounded-none bg-black text-white sm:left-10/12 lg:left-11/12"
      />
      <CarouselNext
        size={"icon-lg"}
        className="hover:bg-baraka-primary-300 -top-10 right-5 rounded-none bg-black text-white"
      />
    </Carousel>
  );
};

export default SimilarProducts;
