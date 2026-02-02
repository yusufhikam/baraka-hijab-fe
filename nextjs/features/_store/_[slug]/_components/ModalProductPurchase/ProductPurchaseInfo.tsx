import { ProductType } from "@/entities/product/types/product.type";
import { moneyFormatter, storageBaseURL } from "@/lib/utils";
import Image from "next/image";

type ProductPurchaseInfoProps = {
  product: ProductType;
  displayStock: number;
};

const ProductPurchaseInfo: React.FC<ProductPurchaseInfoProps> = ({
  product,
  displayStock,
}) => {
  return (
    <div className="mb-5 inline-flex w-full items-start gap-4 border-b border-black pb-5">
      <Image
        src={`${storageBaseURL}/${product.thumbnail}`}
        alt={product.name}
        width={100}
        height={100}
        unoptimized
        priority
        className="aspect-square rounded object-cover object-center"
      />

      <div className="">
        <h3>{moneyFormatter(product.price)}</h3>
        <p>stock: {displayStock}</p>
      </div>
    </div>
  );
};

export default ProductPurchaseInfo;
