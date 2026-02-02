import DateCountDown from "@/components/common/DateCountDown";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import MyToolTip from "@/components/common/MyToolTip";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { TransactionType } from "@/entities/transactions/types/transaction.type";
import { cn, moneyFormatter, storageBaseURL } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { Activity } from "react";

const CardTransactionItemActions = dynamic(
  () =>
    import(
      "@/features/_protected/_transactionsPage/components/TabsTransactions/CardItemTransasction/CartTransactionItem.Actions"
    ),
  { loading: () => <p>Loading...</p> },
);

type CardItemTransasctionProps = {
  transaction: TransactionType;
};

const CardItemTransasction: React.FC<CardItemTransasctionProps> = ({
  transaction,
}) => {
  if (!transaction) return null;

  const normalizedDate = transaction.expired_at?.includes("T")
    ? transaction.expired_at
    : transaction.expired_at?.replace(" ", "T");
  // console.log("🚀 ~ CardItemTransasction ~ normalizedDate:", normalizedDate);

  const isExpired = new Date(transaction.expired_at!) <= new Date();
  console.log("🚀 ~ CardItemTransasction ~ isExpired:", isExpired);
  // console.log("🚀 ~ CardItemTransasction ~ isExpired:", isExpired);
  const status = transaction.status;

  const showCountDown = status === "pending" && !isExpired;
  // console.log("🚀 ~ CardItemTransasction ~ showCountDown:", showCountDown);

  return (
    <Card key={transaction.id} className="font-geist rounded-sm p-2">
      <CardContent className="space-y-4 p-2">
        <CardTitle className="item-center flex justify-between border-b pb-2">
          <p>{transaction.order_id}</p>
          <p className="text-baraka-primary-300 font-normal uppercase">
            {transaction.status}
          </p>
        </CardTitle>

        {transaction.transaction_items.map((item, idx) => {
          const product = item.product_variant_option.product_variant.product;
          const variant = item.product_variant_option.product_variant;
          return (
            <div key={idx} className="flex items-start gap-4">
              <ImageWithFallback
                src={`${storageBaseURL}/${product.thumbnail}`}
                alt="thumbnail"
                width={100}
                height={100}
                className="aspect-square size-20 w-auto object-cover object-center"
              />

              <div className="xs:text-base inline-flex w-full items-start justify-between text-sm">
                <div className="">
                  <p className="capitalize">{product.name}</p>

                  <div className="text-xs text-zinc-400">
                    Variant :{" "}
                    <span className="inline-flex items-center gap-2">
                      Color :
                      <div
                        className="size-3 rounded-full"
                        style={{
                          backgroundColor: variant.color,
                        }}
                      />
                    </span>
                    ,{" "}
                    <span className="">
                      Size : {item.product_variant_option.size}
                    </span>
                  </div>

                  <p className="mt-4">x{item.quantity}</p>
                </div>

                <p className="text-baraka-primary-300 text-sm">
                  {moneyFormatter(product.price)}
                </p>
              </div>
            </div>
          );
        })}

        <CardFooter className="xs:mt-0 mt-10 flex flex-col items-end justify-between gap-5 px-0">
          <p className="text-sm">
            Total Transaction :{" "}
            <span className="text-baraka-primary-300 xs:text-base inline-flex items-center text-sm font-medium">
              {moneyFormatter(transaction.total_price)}
            </span>
          </p>

          <div
            className={cn(
              "w-full",
              status === "canceled" ||
                (status === "expire" &&
                  "xs:flex-row flex flex-col items-center justify-between gap-4"),
            )}
          >
            {/* SHOWING TOOLTIP WHEN STATUS IS CANCELED OR EXPIRE */}
            <Activity
              mode={
                status === "canceled" || status === "expire"
                  ? "visible"
                  : "hidden"
              }
            >
              <p className="text-xs text-zinc-400">
                The transaction was canceled by the Baraka Hijab system.
                <span className="ms-1 inline-flex items-center-safe">
                  <MyToolTip
                    message={
                      <div className="text-black">
                        <p>Transaction canceled because :</p>
                        <p>
                          {status === "expire"
                            ? "No payment"
                            : status === "canceled" && "Canceled by user"}
                        </p>
                      </div>
                    }
                    iconable
                    variant="info"
                    size="sm"
                    className="w-full flex-1 text-black"
                  />
                </span>
              </p>
            </Activity>

            {/* SHOWING COUNT DOWN TO EXPIRE TRANSACTION WHEN STATUS IS PENDING */}
            <Activity mode={status === "pending" ? "visible" : "hidden"}>
              <p className="text-xs text-zinc-400">
                The transaction will expire in{" "}
                <DateCountDown date={transaction.expired_at} />
              </p>
            </Activity>

            <CardTransactionItemActions transaction={transaction} />
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CardItemTransasction;
