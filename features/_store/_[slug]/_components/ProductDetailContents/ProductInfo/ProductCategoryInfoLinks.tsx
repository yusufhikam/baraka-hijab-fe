import { ProductType } from "@/entities/product/types/product.type";
import Link from "next/link";

type ProductInfoCategoryLinksProps = {
  product: ProductType;
};

export default function ProductCategoryInfoLinks({
  product,
}: ProductInfoCategoryLinksProps) {
  return (
    <div className="font-krub space-x-2 text-sm font-bold text-zinc-400 uppercase">
      <Link href={`/store?category=${product.sub_category.category.slug}`}>
        {product.sub_category.category.name}
      </Link>
      <span>/</span>
      <Link href={`/store?sub_category=${product.sub_category.slug}`}>
        {product.sub_category.name}
      </Link>
    </div>
  );
}
