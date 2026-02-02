import { Button } from "@/components/ui/button";
import { Handbag } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <section className="inline-flex w-full flex-col items-center justify-center gap-2 p-4">
      <Handbag />
      <p className="font-geist font-semibold">YOUR CART IS EMPTY</p>

      <div className="mt-20 space-y-5 text-center">
        <h3>You have not added any items to your cart.</h3>
        <Button
          asChild
          className="bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 w-full rounded-xs"
        >
          <Link href="/store">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
