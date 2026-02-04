import MyBreadcrumb from "@/components/common/MyBreadcrumb/MyBreadcrumb";
import { CircleArrowLeft } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carts",
};

const CartList = dynamic(
  () => import("@/features/_cart/_components/CartPage/CartList"),
);

export default function CartPage() {
  return (
    <main className="my-20 w-full px-5">
      <MyBreadcrumb />

      <CartList />

      <hr className="mx-auto mt-20 block h-0.5 w-3/4 bg-black/50 sm:hidden" />

      <Link
        href={"/store"}
        className="font-geist mx-auto mt-20 inline-flex w-full items-center justify-center gap-4 rounded-xs bg-black px-4 py-2 font-bold text-white hover:bg-zinc-800 sm:mt-10 sm:w-fit"
      >
        <CircleArrowLeft size={25} /> CONTINUE SHOPPING
      </Link>
    </main>
  );
}
