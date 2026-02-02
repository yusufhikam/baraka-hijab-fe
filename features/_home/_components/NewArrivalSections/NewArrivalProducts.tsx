import CardProduct from "@/components/common/Product/CardProduct";
import productApi from "@/entities/product/api/productApi";
import { cn } from "@/lib/utils";

export default async function NewArrivalProducts() {
  const { data: products } = await productApi.getArrivalProducts();

  return (
    <div className="xs:grid-cols-2 mt-10 grid w-full gap-5 overflow-hidden lg:grid-cols-4">
      {products.slice(0, 4).map((product) => {
        // const layout = PRODUCT_LAYOUT[i];

        return (
          <CardProduct
            data-animate="new-arrival-product"
            key={product.id}
            product={product}
            className={cn(
              "max-w-none border-none",
              // layout.col,
              // layout.row,
              // layout.aspect,
            )}
          />
        );
      })}
    </div>
  );
}

// type ProductLayout = {
//   col: string;
//   row?: string;
//   aspect?: string;
//   colStart?: string;
// };

// const PRODUCT_LAYOUT: ProductLayout[] = [
//   { col: "lg:col-span-1", aspect: "aspect-square" },
//   { col: "lg:col-span-1", aspect: "aspect-square" },
//   { col: "lg:col-span-1", aspect: "aspect-square" },
//   { col: "lg:col-span-1", aspect: "aspect-square" },
//   {
//     col: "lg:col-span-2",
//     row: "lg:row-span-2",
//     aspect: "lg:aspect-square aspect-video",
//     colStart: "lg:col-start-3",
//   },
// ];
