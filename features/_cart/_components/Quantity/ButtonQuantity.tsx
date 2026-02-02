import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import React from "react";

type ButtonQuantityProps = React.ComponentProps<typeof Button> & {
  icon: "Plus" | "Minus";
};

export default function ButtonQuantity({
  icon = "Minus",
  ...props
}: ButtonQuantityProps) {
  const Icon = icon === "Plus" ? Plus : Minus;
  return (
    <Button variant={"ghost"} type="button" {...props} size={"icon-sm"}>
      <Icon />
    </Button>
  );
}
