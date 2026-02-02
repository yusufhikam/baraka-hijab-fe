"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";

type ModalQuickViewProps = {
  children: React.ReactNode;
  //   open: boolean;
  //   onOpenChange: (open: boolean) => void;
  //   slug: string;
};

const ModalQuickViewIntercepted: React.FC<ModalQuickViewProps> = ({
  children,
  //   slug,
  //   onOpenChange,
  //   open,
}) => {
  const router = useRouter();
  return (
    <Dialog open onOpenChange={() => router.back()}>
      <VisuallyHidden>
        <DialogTitle />
        <DialogDescription />
      </VisuallyHidden>
      <DialogTrigger
        // ref={ref}
        className={cn(
          "bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 font-geist h-10 rounded-none text-xs font-bold hover:text-white",
          //   triggerClassName,
        )}
      >
        QUICK VIEW
      </DialogTrigger>

      <DialogContent className="hide-scrollbar max-h-11/12 overflow-hidden overflow-y-scroll sm:max-w-3/4">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalQuickViewIntercepted;
