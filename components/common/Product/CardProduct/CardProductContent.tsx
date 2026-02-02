import { CardContent } from "@/components/ui/card";
import { ProductType } from "@/entities/product/types/product.type";
import { cn, moneyFormatter } from "@/lib/utils";

type CardProductContentProps = {
  variant: "fetch" | "skeleton";
  product: ProductType | undefined;
};

const CardProductContent = ({ variant, product }: CardProductContentProps) => {
  return (
    <CardContent className="font-geist bg-accent z-5 -space-y-1 px-2 py-1.5 text-left">
      {/* PRODUCT CATEGORY */}
      {/* <p
        className={cn(
          "hidden font-semibold text-zinc-400 uppercase sm:block sm:text-[10px] md:text-xs",
          variant === "skeleton" && "m-auto h-5 w-20 animate-pulse bg-zinc-300",
        )}
      >
        {variant === "fetch" && product?.sub_category.category.name}
      </p> */}

      <div className="">
        {/* PRODUCT NAME */}
        <h5
          className={cn(
            "truncate text-lg capitalize",
            variant === "skeleton" &&
              "m-auto mt-2 h-5 w-40 animate-pulse bg-zinc-300",
          )}
        >
          {variant === "fetch" && product?.name}
        </h5>

        {/* PRODUCT PRICE */}
        <p
          className={cn(
            "text-md font-bold",
            variant === "skeleton" && "m-auto mt-2 h-5 w-20 bg-zinc-300",
          )}
        >
          {variant === "fetch" && moneyFormatter(product?.price)}
        </p>
      </div>
    </CardContent>
  );
};

export default CardProductContent;
