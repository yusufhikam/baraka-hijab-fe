import { TabsContent } from "@/components/ui/tabs";
import CardItemTransasction from "./TabsTransactions/CardItemTransasction";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import InfiniteCursorScrollTrigger from "@/components/common/InfiniteCursorScrollTrigger";
import { TransactionType } from "@/entities/transactions/types/transaction.type";
import TransactionsSkeleton from "./TransactionsSkeleton";

export type TabsContentTransactionListProps = {
  transactions: TransactionType[] | undefined;
  value: "all" | "pending" | "paid" | "expire" | "canceled";
  isFetchingNextPage?: boolean;
  isError?: boolean;
  hasNextPage?: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
};

const TabsContentTransactionList: React.FC<TabsContentTransactionListProps> = ({
  transactions,
  isFetchingNextPage,
  isError,
  hasNextPage,
  refetch,
  fetchNextPage,
  value = "all",
}) => {
  return (
    <TabsContent value={value} className="">
      <section className="space-y-3">
        {transactions?.map((transaction) => (
          <CardItemTransasction
            transaction={transaction}
            key={transaction.id}
          />
        ))}
      </section>

      {isFetchingNextPage && (
        <section className="my-3 w-full">
          <TransactionsSkeleton />
        </section>
      )}

      {isError && (
        <Button
          className="mx-auto my-10"
          variant={"ghost"}
          size={"icon-lg"}
          onClick={() => refetch()}
        >
          <RefreshCcw />
        </Button>
      )}

      <InfiniteCursorScrollTrigger
        hasMore={!!hasNextPage}
        onIntersect={() => fetchNextPage()}
      />
    </TabsContent>
  );
};

export default TabsContentTransactionList;
