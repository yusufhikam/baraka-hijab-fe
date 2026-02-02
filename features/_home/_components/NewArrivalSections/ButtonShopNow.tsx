import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

type ButtonShopNowProps = {
  className?: string;
};
const ButtonShopNow = ({ className }: ButtonShopNowProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "hover:bg-baraka-lightgreen-100 rounded-xs border-zinc-500",
        className,
      )}
    >
      <Link href="/store" prefetch>
        SHOP NOW
        <ArrowBigRight
          strokeWidth={0}
          className="fill-baraka-primary-300 size-5 -rotate-45"
        />
      </Link>
    </Button>
  );
};

export default ButtonShopNow;
