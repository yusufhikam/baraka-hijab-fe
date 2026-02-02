import CheckoutContents from "@/features/_checkout/_components/CheckoutContents";
import dynamic from "next/dynamic";

const MyBreadcrumb = dynamic(
  () => import("@/components/common/MyBreadcrumb/MyBreadcrumb"),
);

const CheckoutPage = () => {
  return (
    <main className="bg-zinc-50 px-5 py-20">
      <MyBreadcrumb />

      <CheckoutContents />
    </main>
  );
};

export default CheckoutPage;
