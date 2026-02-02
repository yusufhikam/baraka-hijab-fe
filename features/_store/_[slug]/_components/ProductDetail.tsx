import productApi from "@/entities/product/api/productApi";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SimilarProducts from "./SimilarProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SimilarProductSkeleton from "./SimilarProducts/SimilarProductSkeleton";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import ProductDetailContents from "./ProductDetailContents";

// const ProductDetailContents = dynamic(() => import("./ProductDetailContents"), {
//   loading: () => <ProductDetailSkeleton />,
// });

type ProductImagesProps = {
  slug: string;
};

export default async function ProductDetail({ slug }: ProductImagesProps) {
  const productData = await productApi.getDetailProduct(slug);

  if (!productData) return notFound();

  const product = productData?.data;

  const similarProductData = productApi.getSimilarProducts(
    product.id,
    product.sub_category.category.slug,
  );

  return (
    <>
      {/* THE PRODUCT DETAILS CONTENT */}
      <section className="my-5 flex w-full flex-col items-start justify-between gap-10 lg:flex-row">
        <ProductDetailContents product={product} />
      </section>

      <hr className="mx-auto mt-20 h-0.5 w-1/2 bg-black" />

      {/* SIMILAR PRODUCT BY CATEGORY */}
      <section className="mt-40">
        <section className="font-geist flex flex-col items-start justify-between gap-16 text-center sm:text-left md:flex-row">
          <h2 className="text-4xl font-semibold uppercase">
            Explore Similar Styles
          </h2>

          <div className="space-y-5 sm:w-1/2">
            <p className="uppercase">
              ELEGANT {product.sub_category.category.name}{" "}
              {product.sub_category.name} - COMFORT, QUALITY, AND TIMELESS
              STYLE, FIND YOUR FAVORITE TODAY!
            </p>

            <Button
              asChild
              size={"lg"}
              className="rounded-none border border-black hover:bg-black hover:text-white"
              variant={"outline"}
            >
              <Link
                className="font-medium"
                href={`/store?category=${product.sub_category.category.slug}`}
              >
                SEE MORE ARTICLES
              </Link>
            </Button>
          </div>
        </section>

        <Suspense fallback={<SimilarProductSkeleton />}>
          <SimilarProducts product={similarProductData} />
        </Suspense>
      </section>
    </>
  );
}
