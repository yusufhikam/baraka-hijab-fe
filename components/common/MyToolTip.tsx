import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type MyToolTipProps = {
  className?: string;
  message: string | undefined | React.ReactNode; // show message
  variant?: "success" | "info" | "error" | "warning" | "default";
  iconable?: boolean; // show icon
  triggerTitle?: React.ReactNode; // show button title
  size?: "sm" | "md" | "lg"; // size of trigger
  onClick?: () => void;
};

export default function MyToolTip({
  message,
  variant = "default",
  iconable = false,
  size = "lg",
  triggerTitle,
  className,
  onClick,
}: MyToolTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild className={cn("", className)}>
        {iconable ? (
          <InfoIcon
            className={cn(
              "",
              variant === "success" && "text-green-500",
              variant === "info" && "text-blue-500",
              variant === "error" && "text-red-500",
              variant === "warning" && "text-yellow-500",
              variant === "default" && "text-zinc-800",

              size === "sm" && "size-4",
              size === "md" && "size-5",
              size === "lg" && "size6",
            )}
          />
        ) : (
          <Button onClick={onClick}>{triggerTitle}</Button>
        )}
      </TooltipTrigger>

      <TooltipContent
        className="rounded-xs bg-white shadow-lg shadow-black/20"
        toolTipArrowClassName="bg-white fill-white"
      >
        <div className={cn("", variant === "error" && "text-red-500")}>
          {message}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
