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
import { cn } from "@/lib/utils";
import { Loader2, Trash2Icon } from "lucide-react";

type ButtonDeleteAddressProps = {
  isLoadingDelete: boolean;
  isLoadingUpdate: boolean;
  isLoadingSetPrimary: boolean;
  handleDelete: () => void;
  className?: string;
};

export default function ButtonDeleteAddress({
  isLoadingDelete,
  isLoadingUpdate,
  isLoadingSetPrimary,
  handleDelete,
  className,
}: ButtonDeleteAddressProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Delete Address"
          className={cn(
            "inline-flex h-6 items-center justify-start rounded-sm bg-white text-xs text-black uppercase hover:bg-red-500 hover:text-white",
            className,
          )}
        >
          <Trash2Icon />
          {/* Delete */}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mt-5 text-center">
          <DialogTitle>Are you sure want to delete this address ?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            address
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-4">
          <DialogClose className="cursor-pointer" asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-24",
                isLoadingDelete && "animate-pulse cursor-wait",
              )}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            disabled={isLoadingDelete || isLoadingSetPrimary || isLoadingUpdate}
            variant={"destructive"}
            onClick={handleDelete}
            className={cn(
              "w-24 cursor-pointer",
              isLoadingDelete && "animate-pulse cursor-wait",
            )}
          >
            {isLoadingDelete ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
