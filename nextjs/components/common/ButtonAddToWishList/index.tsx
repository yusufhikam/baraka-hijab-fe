"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

type ButtonAddToWishListProps = React.ComponentProps<typeof Button> & {};

export default function ButtonAddToWishList({
  ...props
}: ButtonAddToWishListProps) {
  const [addWishList, setAddWishList] = useState(false);

  return (
    <Button
      {...props}
      variant={addWishList ? "destructive" : "outline"}
      className={cn(
        "",
        props.className,
        addWishList
          ? "active:bg-red-300"
          : "active:bg-baraka-lightgreen-200 bg-baraka-lightgreen-200/50 active:text-white",
      )}
      onClick={() => setAddWishList(!addWishList)}
    >
      <Heart fill="transparent" className={cn("")} />
    </Button>
  );
}
