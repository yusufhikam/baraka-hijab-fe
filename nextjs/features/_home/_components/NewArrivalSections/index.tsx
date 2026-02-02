import { Suspense } from "react";
import NewArrivalProducts from "./NewArrivalProducts";
import NewArrivalProductSkeleton from "./NewArrivalProductSkeleton";
import AboutBaraka from "./AboutBaraka";
// import ButtonShopNow from "./ButtonShopNow";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NewArrivalSection() {
  return (
    <section className="mb-5 flex w-full flex-col items-center px-5 py-10">
      <hr className="order-first mx-auto block w-[90%] bg-black sm:hidden" />

      <AboutBaraka />

      <div
        data-animate="new-arrival-section-wrapper"
        className="order-first my-10 w-full sm:order-last"
      >
        <div className="inline-flex w-full items-center justify-center sm:justify-between">
          <h2 data-animate="new-arrival-title" className="text-2xl">
            New Arrivals
          </h2>

          {/* <ButtonShopNow className="hidden sm:flex" /> */}
          <Link
            data-animate="new-arrival-section-title-link"
            href={"/store"}
            className="hidden items-center hover:underline hover:underline-offset-2 sm:inline-flex"
          >
            View All Collection <ArrowUpRight size={20} />
          </Link>
        </div>

        <Suspense fallback={<NewArrivalProductSkeleton />}>
          <NewArrivalProducts />
        </Suspense>

        {/* <ButtonShopNow className="m-auto mt-20 flex w-fit rounded-xs font-semibold sm:hidden" /> */}
        <div className="flex items-center justify-center">
          <Link
            href={"/store"}
            className="mt-10 inline-flex items-center hover:underline hover:underline-offset-2 sm:hidden"
          >
            View All Collection <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
