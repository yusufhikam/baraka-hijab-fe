import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmptyCart from "../EmptyCart";
import { Handbag } from "lucide-react";
import GroupedCartItems from "../GroupedCartItem";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { GuestCartPayloadType } from "@/entities/cart/types/cart.type";

type CartPopoverProps = {
  isLoadCarts: boolean;
  totalItems: number | undefined;
  carts: GuestCartPayloadType[];
};

const CartPopover: React.FC<CartPopoverProps> = ({
  isLoadCarts,
  totalItems,
  carts,
}) => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "relative cursor-pointer",
          isLoadCarts && "animate-pulse cursor-wait",
        )}
      >
        {!isLoadCarts && totalItems !== 0 && (
          <p className="absolute -top-1 -right-1 inline-flex size-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {totalItems}
          </p>
        )}
        <Handbag className="hover:text-baraka-primary-300" />
      </PopoverTrigger>

      <PopoverContent
        align="center"
        side="bottom"
        sideOffset={20}
        className="w-full shadow-lg shadow-black/30 sm:me-5 sm:w-[500px]"
      >
        <section className="max-h-[400px] overflow-hidden overflow-y-auto">
          {totalItems === 0 ? (
            <EmptyCart />
          ) : (
            <section className="space-y-5 p-2">
              {isLoadCarts ? (
                <p>Loading...</p>
              ) : (
                <GroupedCartItems carts={carts} />
              )}
            </section>
          )}
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default memo(CartPopover);
