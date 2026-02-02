import { PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type CartTriggerProps = {
  variant: "popover" | "drawer";
};

const CartTrigger: React.FC<CartTriggerProps> = ({ variant }) => {
  // if(variant === 'popover'){
  //     return <PopoverTrigger
  //     className={cn(
  //       "relative cursor-pointer",
  //       isLoadCarts && "animate-pulse cursor-wait",
  //     )}
  //   >
  //     {!isLoadCarts && totalItems !== 0 && (
  //       <p className="absolute -top-1 -right-1 inline-flex size-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
  //         {totalItems}
  //       </p>
  //     )}
  //     <Handbag className="hover:text-baraka-primary-300" />
  //   </PopoverTrigger>
  // }

  return null;
};

export default CartTrigger;
