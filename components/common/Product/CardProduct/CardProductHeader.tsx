import { CardHeader } from "@/components/ui/card";
import { ProductType } from "@/entities/product/types/product.type";
import { cn, storageBaseURL } from "@/lib/utils";
import ImageWithFallback from "../../ImageWithFallback";

type CardProductHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  product: ProductType | undefined;
  variant?: "fetch" | "skeleton";
};

const CardProductHeader = ({
  variant,
  product,
  ...props
}: CardProductHeaderProps) => {
  const productThumbnail = `${storageBaseURL}/${product?.thumbnail}`;

  return (
    <CardHeader
      {...props}
      className={cn(
        "group aspect-4/5 overflow-hidden p-0",
        variant === "skeleton" && "animate-pulse bg-zinc-300",
      )}
    >
      <ImageWithFallback
        src={productThumbnail || "/svg/taken.svg"}
        alt="product"
        width={100}
        height={100}
        // unoptimized
        wraperClassName="aspect-4/5 w-full "
        className={cn(
          "aspect-4/5 w-full origin-center bg-bottom object-cover transition-transform duration-300 group-hover:scale-110",
          variant === "skeleton" && "hidden",
        )}
      />
    </CardHeader>
  );
};

export default CardProductHeader;
