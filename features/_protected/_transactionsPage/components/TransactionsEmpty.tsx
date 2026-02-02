import { TransactionsQueryParams } from "@/entities/transactions/types/transactionQueryParam.type";
import OnlineTransactionSvg from "../../../../public/svg/online-transaction.svg";
import Image from "next/image";
import React from "react";

type TransactionsEmptyProps = {
  status?: TransactionsQueryParams["status"];
};
const TransactionsEmpty: React.FC<TransactionsEmptyProps> = ({ status }) => {
  const transasctionStatus =
    status === "all" || status === "pending" || status === "paid"
      ? "any transactions"
      : status === "canceled"
        ? "canceled transactions"
        : status === "expire" && "expired payments";
  return (
    <section className="font-geist space-y-10 bg-white py-10 text-center sm:min-h-[50vh]">
      <Image
        alt="svg"
        className="mx-auto size-1/2"
        src={OnlineTransactionSvg}
      />
      <h1 className="text-xl font-semibold sm:text-4xl">
        You don&apos;t have {transasctionStatus} right now.
      </h1>
    </section>
  );
};

export default TransactionsEmpty;
