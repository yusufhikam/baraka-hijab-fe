"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductParamsQuery } from "@/entities/product/types/productParamQuery.type";
import { cn } from "@/lib/utils";
import getActiveSearchParams from "@/utils/getActiveSearchParams";
import updateSearchParams from "@/utils/updateSearchParams";
import { ArrowUpDownIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_MENUS = [
  {
    label: "Lowest Price",
    value: "lowest",
  },
  {
    label: "Highest Price",
    value: "highest",
  },
] as const;

const SortFilter: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeParams = getActiveSearchParams(searchParams);

  const handleSortFilter = (key: keyof ProductParamsQuery, value: string) => {
    router.push(`/store?${updateSearchParams({ key, searchParams, value })}`, {
      scroll: false,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ArrowUpDownIcon size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_MENUS.map((menu) => (
          <DropdownMenuItem
            key={menu.value}
            className={cn(
              "",
              activeParams["sort"]?.includes(menu.value) &&
                "bg-baraka-primary-300 pointer-events-none text-white",
            )}
            onClick={() => handleSortFilter("sort", menu.value)}
          >
            {menu.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortFilter;
