"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDetailProductQuery from "@/entities/product/hooks/useProductsQuery";
import { ProductType } from "@/entities/product/types/product.type";
import ProductDetailContents from "@/features/_store/_[slug]/_components/ProductDetailContents";
import ProductDetailSkeleton from "@/features/_store/_[slug]/_components/ProductDetailSkeleton";
import usePauseLenis from "@/hooks/usePauseLenis";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Activity, forwardRef } from "react";

type ModalQuickViewProps = {
  product?: Pick<ProductType, "id" | "slug">;
  triggerClassName?: string;
  //   open: boolean;
  //   onOpenChange: (open: boolean) => void;
};
const ModalQuickView = forwardRef<HTMLButtonElement, ModalQuickViewProps>(
  ({ triggerClassName, product }, ref) => {
    const { openModal, setOpenModal } = usePauseLenis();
    const { data, isLoading } = useDetailProductQuery({ product, openModal });

    const productData = data?.data;

    if (!product) return null;

    return (
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>
        <DialogTrigger
          ref={ref}
          className={cn(
            "bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 font-geist h-10 rounded-none text-xs font-bold hover:text-white",
            triggerClassName,
          )}
        >
          QUICK VIEW
        </DialogTrigger>

        <DialogContent className="hide-scrollbar max-h-11/12 overflow-hidden overflow-y-scroll sm:max-w-3/4">
          <Activity mode={isLoading ? "visible" : "hidden"}>
            <ProductDetailSkeleton />
          </Activity>

          <Activity mode={isLoading ? "hidden" : "visible"}>
            <ProductDetailContents product={productData!} />
          </Activity>
        </DialogContent>
      </Dialog>
    );
  },
);

ModalQuickView.displayName = "ModalQuickView";

export default ModalQuickView;
