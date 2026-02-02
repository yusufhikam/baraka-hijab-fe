"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import getActiveSearchParams from "@/utils/getActiveSearchParams";
import { XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity } from "react";

const EXCLUDED_PARAMS = ["search", "page"];

type AppliedFilterProps = {
  className?: string;
};
export default function AppliedFilter({ className }: AppliedFilterProps) {
  const router = useRouter();
  const params = useSearchParams();

  const activeFilters = getActiveSearchParams(params);

  const entries = Object.entries(activeFilters).filter(
    ([key]) => !EXCLUDED_PARAMS.includes(key),
  );

  const deleteFilter = (key: string) => {
    const newParams = new URLSearchParams(params.toString());

    newParams.delete(key);

    const newSearch = newParams.toString();
    const newUrl = newSearch ? `?${newSearch}` : "/store";
    router.push(newUrl, { scroll: false });
  };

  const resetFilters = () => {
    const newParams = new URLSearchParams();

    const newSearch = newParams.toString();
    const newUrl = newSearch ? `?${newSearch}` : "/store";
    router.push(newUrl, { scroll: false });
  };

  return (
    <section
      className={cn("font-geist flex items-center gap-4 text-sm", className)}
    >
      {entries.length > 0 && <h2>Applied Filter : </h2>}
      {!entries.length && !params.get("search") && <h2>All Collections</h2>}

      <Activity mode={entries.length > 0 ? "visible" : "hidden"}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {entries.map(([key, values]) =>
            values.map((value, idx) => (
              <span
                key={key + value + idx}
                className="relative col-span-1 inline-flex items-center justify-center rounded bg-zinc-200 px-2 py-1 text-zinc-700 capitalize"
              >
                <Activity mode={key === "min_price" ? "visible" : "hidden"}>
                  Min.Price :{" "}
                </Activity>
                <Activity mode={key === "max_price" ? "visible" : "hidden"}>
                  Max.Price :{" "}
                </Activity>
                {value}
                <XIcon
                  onClick={() => deleteFilter(key)}
                  size={18}
                  className="absolute -top-2 -right-2 cursor-pointer text-black"
                />
              </span>
            )),
          )}

          <Button variant={"destructive"} onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </Activity>
    </section>
  );
}
