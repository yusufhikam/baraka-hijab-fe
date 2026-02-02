"use client";

import { Button } from "@/components/ui/button";
import useMidtransPayment from "@/entities/checkout/hooks/useMidtransPayment";
import { TransactionType } from "@/entities/transactions/types/transaction.type";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Activity } from "react";

type CardTransactionItemActionsProps = {
  transaction?: TransactionType | undefined;
};

const CardTransactionItemActions: React.FC<CardTransactionItemActionsProps> = ({
  transaction,
}) => {
  const router = useRouter();
  const { initiatePayment, isProcessing } = useMidtransPayment();
  const status = transaction?.status;

  const handlePay = async () => {
    if (status !== "pending" || !transaction?.snap_token) return;

    await initiatePayment(transaction.snap_token, transaction.order_id);
  };

  const isDisabled = isProcessing;

  return (
    <div className="font-geist xs:flex-row inline-flex w-full flex-1 flex-col items-center justify-end gap-4 overflow-hidden">
      {/* SHOW PAY NOW WHEN STATUS PENDING */}
      <Activity mode={status === "pending" ? "visible" : "hidden"}>
        <Button
          onClick={handlePay}
          disabled={isDisabled}
          className={cn(
            "bg-baraka-primary-300 xs:inline-flex xs:min-w-40 min-w-full cursor-pointer items-center justify-center rounded-none",
            isDisabled && "cursor-wait",
          )}
        >
          {isDisabled ? <Loader2 className="animate-spin" /> : "Pay Now"}
        </Button>
      </Activity>

      {/* SHOW WHEN STATUS PAID */}

      <Activity mode={status === "paid" ? "visible" : "hidden"}>
        <Button className="bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 xs:min-w-40 min-w-full cursor-pointer rounded-none hover:text-white">
          Rate Product
        </Button>
      </Activity>

      <Activity
        mode={
          status === "paid" || status === "expire" || status === "canceled"
            ? "visible"
            : "hidden"
        }
      >
        <Button
          onClick={() => router.push("/store", { scroll: false })}
          variant={status !== "pending" ? "outline" : "default"}
          className={cn(
            "xs:min-w-40 min-w-full cursor-pointer rounded-none",
            status === "pending" || status === "expire"
              ? "bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 text-white hover:text-white"
              : "border-baraka-primary-300",
          )}
        >
          Buy Again
        </Button>
      </Activity>

      {/* SHOW CANCEL BUTTON WHEN STATUS PENDING */}
      <Activity mode={status === "pending" ? "visible" : "hidden"}>
        <Button
          className="xs:min-w-40 min-w-full cursor-pointer rounded-none border-red-500"
          variant={"outline"}
        >
          Cancel
        </Button>
      </Activity>

      {/* END SHOW WHEN STATUS PAID */}
      {/* <Activity mode={status !== "expire" ? "visible" : "hidden"}>
        <HoverCard openDelay={1} closeDelay={1}>
          <HoverCardTrigger asChild>
            <Button
              variant={"outline"}
              className="border-baraka-primaxs:min-w-40 min-w-full w-full  rounded-none"
            >
              OTHER
            </Button>
          </HoverCardTrigger>

          <HoverCardContent sideOffset={0} className="rounded-xs p-1 text-left">
            

            <Activity mode={status === "paid" ? "visible" : "hidden"}>
              <Button
                className="xs:min-w-40 min-w-full w-full  cursor-pointer rounded-none"
                variant={"ghost"}
              >
                Rate Product
              </Button>
            </Activity>
          </HoverCardContent>
        </HoverCard>
      </Activity> */}
    </div>
  );
};

export default CardTransactionItemActions;
