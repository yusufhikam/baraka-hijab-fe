import { Card, CardContent, CardHeader } from "@/components/ui/card";

const UserPrimaryAddressSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="inline-flex flex-1 gap-5">
          <div className="h-8 w-18 animate-pulse rounded-md bg-zinc-300" />
          <div className="h-8 w-18 animate-pulse rounded-md bg-zinc-300" />
        </div>
        <div className="h-8 w-18 flex-1 animate-pulse rounded-md bg-zinc-300" />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="">
          <div className="mb-2 h-8 w-28 animate-pulse rounded-md bg-zinc-300" />
          <div className="h-8 w-60 animate-pulse rounded-md bg-zinc-300" />
        </div>

        <div className="space-y-2">
          <div className="h-8 w-32 animate-pulse rounded-md bg-zinc-300" />
          <div className="h-8 w-36 animate-pulse rounded-md bg-zinc-300" />
          <div className="h-8 w-40 animate-pulse rounded-md bg-zinc-300" />
          <div className="h-8 w-56 animate-pulse rounded-md bg-zinc-300" />
        </div>

        <div className="space-y-2">
          <div className="h-8 w-full animate-pulse rounded-md bg-zinc-300" />
          <div className="h-8 w-1/2 animate-pulse rounded-md bg-zinc-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPrimaryAddressSkeleton;
