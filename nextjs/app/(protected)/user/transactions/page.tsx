"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTransactionCursorQuery from "@/entities/transactions/hooks/useTransactionQuery.Cursor";
import { TransactionsQueryParams } from "@/entities/transactions/types/transactionQueryParam.type";
import TabsContentTransactionList from "@/features/_protected/_transactionsPage/components/TransactionList";
import TransactionsEmpty from "@/features/_protected/_transactionsPage/components/TransactionsEmpty";
import TransactionsSkeleton from "@/features/_protected/_transactionsPage/components/TransactionsSkeleton";
import updateSearchParams from "@/utils/updateSearchParams";
import {
  CalendarX2,
  ClockAlert,
  HandCoins,
  PackageCheck,
  XCircleIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity } from "react";

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status =
    (searchParams.get("status") as TransactionsQueryParams["status"]) ?? "all";

  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useTransactionCursorQuery({
    per_page: 5,
    status: status,
  });

  const transactions = data?.pages.flatMap((page) => page.data);

  const onTabValueChange = (value: string) => {
    const newParams = updateSearchParams({
      key: "status",
      searchParams,
      value,
    });

    router.push(`?${newParams}`, { scroll: false });
  };

  return (
    <main className="">
      <Tabs defaultValue={status} onValueChange={onTabValueChange}>
        <TabsList className="xs:overflow-x-auto hide-scrollbar my-10 flex h-14 w-full items-center justify-between overflow-x-scroll rounded-xs">
          {TRANSACTIONS_TAB.map((tab) => (
            <TabsTrigger
              value={tab.value}
              key={tab.label}
              className="data-[state=active]:bg-baraka-primary-300 rounded-xs data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <Activity mode={isLoading ? "visible" : "hidden"}>
          <TransactionsSkeleton />
        </Activity>

        <Activity mode={!transactions?.length ? "visible" : "hidden"}>
          <TransactionsEmpty status={status} />
        </Activity>

        <TabsContentTransactionList
          value={status}
          transactions={transactions}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          refetch={refetch}
          fetchNextPage={fetchNextPage}
          isError={isError}
        />
      </Tabs>
    </main>
  );
}

const TRANSACTIONS_TAB = [
  {
    value: "all",
    label: "All Transactions",
    icon: HandCoins,
  },
  {
    value: "pending",
    label: "Waiting Payments",
    icon: ClockAlert,
  },
  {
    value: "paid",
    label: "Done Transactions",
    icon: PackageCheck,
  },
  {
    value: "canceled",
    label: "Canceled Transactions",
    icon: XCircleIcon,
  },
  {
    value: "expire",
    label: "Expired Payments",
    icon: CalendarX2,
  },
];
