import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BillingDetailsSkeleton = () => {
  return (
    <Card className="sticky top-20 bottom-0 w-full min-w-xs md:w-1/2">
      <CardHeader>
        <CardTitle className="size-8 w-30 animate-pulse rounded-md bg-zinc-300" />
      </CardHeader>

      <CardContent>
        <section className="space-y-2">
          <div className="space-y-5">
            <div className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="size-8 w-56 animate-pulse rounded-md bg-zinc-300" />
                  <div className="mt-3 inline-flex items-center gap-2 text-xs">
                    <div className="size-6 animate-pulse rounded-md bg-zinc-300" />
                    <div className="size-6 w-20 animate-pulse rounded-md bg-zinc-300" />
                  </div>
                </div>
                <div className="size-8 w-46 animate-pulse rounded-md bg-zinc-300" />
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-1">
            <div className="inline-flex w-full items-start justify-between">
              <div className="size-8 w-30 animate-pulse rounded-md bg-zinc-300" />
              <div className="size-8 w-30 animate-pulse rounded-md bg-zinc-300" />
            </div>
            <div className="inline-flex w-full items-start justify-between">
              <div className="size-8 w-30 animate-pulse rounded-md bg-zinc-300" />
              <div className="size-8 w-20 animate-pulse rounded-md bg-zinc-300" />
            </div>
            <div className="inline-flex w-full items-start justify-between">
              <div className="size-8 w-20 animate-pulse rounded-md bg-zinc-300" />
              <div className="size-8 w-10 animate-pulse rounded-md bg-zinc-300" />
            </div>
          </div>

          <div className="size-8 w-full rounded-md bg-zinc-300" />
        </section>
      </CardContent>
    </Card>
  );
};

export default BillingDetailsSkeleton;
