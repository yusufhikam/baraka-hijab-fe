import MyBreadcrumb from "@/components/common/MyBreadcrumb/MyBreadcrumb";
import categoryApi from "@/entities/category/api/categoryApi";
import { ProductParamsQuery } from "@/entities/product/types/productParamQuery.type";
import AppliedFilter from "@/features/_store/_components/AppliedFilter";
import ProductList from "@/features/_store/_components/ProductList";
import SkeletonProductList from "@/features/_store/_components/ProductList/SkeletonProductList";
import SidebarProductFilterSkeleton from "@/features/_store/_components/SidebarProductFilter/SidebarProductFilterSkeleton";
import StoreHeader from "@/features/_store/_components/StoreHeader";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// const ProductList = dynamic(
//   () => import("@/features/_store/_components/ProductList"),
// );

const DrawerSideBarFilter = dynamic(
  () =>
    import(
      "@/features/_store/_components/SidebarProductFilter/DrawerSideBarFilter"
    ),
);
const SidebarProductFilter = dynamic(
  () => import("@/features/_store/_components/SidebarProductFilter"),
  { loading: () => <SidebarProductFilterSkeleton /> },
);

type ProductPageProps = {
  searchParams: Promise<ProductParamsQuery>;
};

export const metadata: Metadata = {
  title: "Store",
  description: "",
};

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  const productParams = await searchParams;
  const { data: categories } = await categoryApi.getCategories();

  return (
    <main className="container-fluid mx-auto mt-10 min-h-dvh w-full bg-zinc-100 px-5 py-10">
      <section className="flex flex-col gap-5 sm:gap-0">
        <div className="order-last sm:order-first">
          <StoreHeader />
        </div>

        <div className="">
          <MyBreadcrumb />
        </div>
      </section>

      {/* SHOW IN MOBILE ONLY */}
      <div className="ms-5 mt-5 inline-flex items-center gap-5 md:hidden">
        <DrawerSideBarFilter categories={categories} />
        <AppliedFilter />
      </div>

      <section className="mt-5 flex flex-col items-center justify-between gap-5 md:flex-row md:items-start">
        <div className="hidden w-1/5 md:block">
          <SidebarProductFilter categories={categories} />
        </div>

        <div className="w-full px-5 md:w-4/5 md:px-0">
          {/* SHOWING APPLIED FILTER ON DESKTOP */}
          <AppliedFilter className="hidden md:flex" />

          <Suspense fallback={<SkeletonProductList />}>
            <ProductList searchParams={productParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
