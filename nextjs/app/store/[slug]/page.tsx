import productApi from "@/entities/product/api/productApi";
import ProductDetail from "@/features/_store/_[slug]/_components/ProductDetail";
import ProductDetailSkeleton from "@/features/_store/_[slug]/_components/ProductDetailSkeleton";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// const ProductDetail = dynamic(
//   () => import("@/features/_store/_[slug]/_components/ProductDetail"),
// );

const BreadCrumb = dynamic(
  () => import("@/components/common/MyBreadcrumb/MyBreadcrumb"),
);

type DetailProductProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const { data: products } = await productApi.getProducts({});

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: DetailProductProps): Promise<Metadata> {
  const { slug } = await params;
  const productData = await productApi.getDetailProduct(slug);

  if (!productData) return { title: "Product Not Found" };

  const { data: product } = productData;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      locale: "id_ID",
      siteName: "Baraka Hijab",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/store/${slug}`,
      images: [product.product_variants[0].photos[0].photo],
    },
  };
}

export default async function DetailProductPage({
  params,
}: DetailProductProps) {
  const { slug } = await params;

  return (
    <main className="mt-20 overflow-hidden px-5 pb-10">
      {/* <Image src={'../'}/> */}

      <BreadCrumb />

      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail slug={slug} />
      </Suspense>
    </main>
  );
}
