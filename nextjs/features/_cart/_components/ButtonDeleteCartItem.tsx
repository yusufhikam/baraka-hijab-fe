import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCartActions from "@/entities/cart/hooks/useCartActions";
import { cn } from "@/lib/utils";
import { Loader2, Trash2 } from "lucide-react";

type ButtonDeleteCartItemProps = {
  product_variant_option_id: number;
};
const ButtonDeleteCartItem: React.FC<ButtonDeleteCartItemProps> = ({
  product_variant_option_id,
}) => {
  const { handleDeleteCart, isDeletingLoading } = useCartActions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          size={"icon-sm"}
          className="cursor-pointer hover:bg-red-700 active:scale-90"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mt-5 px-2">
          <DialogTitle className="text-xl">
            Are you sure want to delete this product from your cart ?
          </DialogTitle>
          <DialogDescription className="text-base">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="font-geist inline-flex items-center justify-end gap-5">
            <DialogClose asChild>
              <Button
                variant={"outline"}
                disabled={isDeletingLoading}
                className={cn(
                  "w-24 ring",
                  isDeletingLoading && "animate-pulse cursor-wait",
                )}
              >
                CANCEL
              </Button>
            </DialogClose>

            <Button
              disabled={isDeletingLoading}
              variant={"destructive"}
              className={cn(
                "w-24",
                isDeletingLoading && "animate-pulse cursor-wait",
              )}
              onClick={() => handleDeleteCart(product_variant_option_id)}
            >
              {isDeletingLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "DELETE"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonDeleteCartItem;
