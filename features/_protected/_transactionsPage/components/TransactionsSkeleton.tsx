import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

const TransactionsSkeleton = () => {
  return Array.from({ length: 5 }).map((_, idx) => (
    <Card key={idx} className="font-geist mb-3 overflow-hidden rounded-sm p-2">
      <CardContent className="xs:p-2 space-y-4 p-4">
        <CardTitle className="item-center flex justify-between border-b pb-2">
          <div className="h-6 w-32 animate-pulse rounded-xs bg-zinc-300" />
          <div className="h-6 w-20 animate-pulse rounded-xs bg-zinc-300" />
        </CardTitle>

        <div className="flex items-start gap-4">
          <div className="aspect-square size-20 w-auto animate-pulse bg-zinc-300 object-cover object-center" />

          <div className="inline-flex w-full items-start justify-between">
            <div className="">
              <div className="mb-2 h-6 w-56 animate-pulse rounded-xs bg-zinc-300" />

              <div className="flex items-center space-x-4 text-xs text-zinc-400">
                <div className="h-4 w-18 animate-pulse rounded-xs bg-zinc-300" />

                <div className="h-4 w-10 animate-pulse rounded-xs bg-zinc-300" />
              </div>

              <div className="mt-4 aspect-square h-6 animate-pulse rounded-xs bg-zinc-300" />
            </div>

            <div className="h-6 w-32 animate-pulse rounded-xs bg-zinc-300" />
          </div>
        </div>

        <CardFooter className="flex flex-col items-end justify-between gap-5 px-0">
          <div className="h-6 w-56 animate-pulse rounded-xs bg-zinc-300" />

          <div className="flex items-center gap-5">
            <div className="h-8 w-32 animate-pulse rounded-xs bg-zinc-300" />
            <div className="h-8 w-32 animate-pulse rounded-xs bg-zinc-300" />
            <div className="h-8 w-32 animate-pulse rounded-xs bg-zinc-300" />
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  ));
};

export default TransactionsSkeleton;
