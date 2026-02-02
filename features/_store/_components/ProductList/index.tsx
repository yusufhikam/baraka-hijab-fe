import CardProduct from "@/components/common/Product/CardProduct";
import productApi from "@/entities/product/api/productApi";
import EmptyProduct from "./EmptyProduct";
import { ProductParamsQuery } from "@/entities/product/types/productParamQuery.type";
import SortFilter from "../SortFilter";
import MyPagination from "@/components/common/MyPagination";

type ProductListProps = {
  searchParams: ProductParamsQuery;
};

export default async function ProductList({ searchParams }: ProductListProps) {
  const { data, meta } = await productApi.getProducts(searchParams);

  return (
    <>
      <div className="me- my-5 inline-flex w-full items-center justify-end gap-4">
        <SortFilter />
        <p className="text-sm">
          Showing {data.length} results of {meta?.total}
        </p>
      </div>

      <section className="mx-auto grid w-full grid-cols-2 items-center justify-center gap-4 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4">
        {!data.length ? (
          <div className="col-span-full my-10 w-full">
            <EmptyProduct />
          </div>
        ) : (
          data.map((product) => (
            <CardProduct
              key={product.id}
              product={product}
              variant="fetch"
              className="border-none shadow-none"
              displayModalQuickView
            />
          ))
        )}
      </section>

      {/* PAGINATION */}
      <MyPagination meta={meta!} />
    </>
  );
}
