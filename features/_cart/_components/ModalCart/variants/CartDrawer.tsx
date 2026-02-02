import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Handbag } from "lucide-react";
import EmptyCart from "../EmptyCart";
import GroupedCartItems from "../GroupedCartItem";
import { GuestCartPayloadType } from "@/entities/cart/types/cart.type";
import { memo } from "react";
import useMediaMatcher from "@/hooks/useMediaMatcher";

type CartDrawerProps = {
  isLoadCarts: boolean;
  totalItems: number | undefined;
  carts: GuestCartPayloadType[];
};

const CartDrawer: React.FC<CartDrawerProps> = ({
  carts,
  isLoadCarts,
  totalItems,
}) => {
  const isDesktop = useMediaMatcher("(min-width:768px)");

  return (
    <Drawer direction={isDesktop ? "right" : "bottom"} fixed autoFocus>
      <DrawerTrigger
        className={cn(
          "md relative cursor-pointer",
          isLoadCarts && "animate-pulse cursor-wait",
        )}
      >
        {!isLoadCarts && totalItems !== 0 && (
          <p className="absolute -top-1 -right-1 inline-flex size-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {totalItems}
          </p>
        )}
        <Handbag className="hover:text-baraka-primary-300" />
      </DrawerTrigger>

      <DrawerContent className="w-full p-0 shadow-lg shadow-black/30">
        <VisuallyHidden>
          <DrawerDescription />
        </VisuallyHidden>

        <DrawerHeader>
          <DrawerTitle className={cn("", totalItems === 0 && "hidden")}>
            Your Carts
          </DrawerTitle>
        </DrawerHeader>

        {totalItems === 0 ? (
          <EmptyCart />
        ) : (
          <section className="space-y-5 p-2">
            {isLoadCarts ? (
              <p>Loading...</p>
            ) : (
              <GroupedCartItems
                carts={carts}
                variant="drawer"
                className="max-h-[300px] overflow-hidden overflow-y-auto p-2 md:max-h-[450px]"
              />
            )}
          </section>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default memo(CartDrawer);
