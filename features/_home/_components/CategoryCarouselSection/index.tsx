import categoryApi from "@/entities/category/api/categoryApi";
import CategoryCarouselContent from "./CategoryCarouselContent";
import { Suspense } from "react";
import CategoryCarouselSkeleton from "./CategoryCarouselSkeleton";

export default async function CategoryCarouselSection() {
  const { data: subCategories } = await categoryApi.getCarouselCategories();

  return (
    <section className="relative z-1 h-dvh w-full overflow-hidden lg:h-[180dvh]">
      {/* <h2 className="font-geist text-xl capitalize">Categories</h2> */}
      <Suspense fallback={<CategoryCarouselSkeleton />}>
        <CategoryCarouselContent subCategories={subCategories} />
      </Suspense>
    </section>
  );
}
