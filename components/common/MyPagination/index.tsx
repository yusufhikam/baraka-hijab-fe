"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductParamsQuery } from "@/entities/product/types/productParamQuery.type";
import { cn } from "@/lib/utils";
import getPaginationRange from "@/utils/getPaginationRange";
import updateSearchParams from "@/utils/updateSearchParams";
import { useRouter, useSearchParams } from "next/navigation";

type MyPaginationProps = {
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

const DELTA = 2;
const MyPagination: React.FC<MyPaginationProps> = ({ meta }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (key: keyof ProductParamsQuery, page: number) => {
    router.push(
      `/store?${updateSearchParams({ key, searchParams, value: String(page) })}`,
      { scroll: false },
    );
  };

  const pages = getPaginationRange({
    currentPage: meta.current_page,
    lastPage: meta.last_page,
    delta: DELTA,
  });

  if (meta.current_page === 1 && meta.last_page === 1) return null;

  return (
    <Pagination className="mt-20">
      <PaginationContent className="space-x-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              meta.current_page > 1 &&
              handlePageChange("page", meta.current_page - 1)
            }
            className={cn(
              "bg-baraka-lightgreen-200 cursor-pointer rounded-none text-white hover:bg-black hover:text-white",
              meta.current_page === 1 &&
                "border-baraka-lightgreen-200 pointer-events-none border bg-transparent text-black opacity-50",
            )}
          />
        </PaginationItem>

        {pages.map((item, idx) => (
          <PaginationItem key={idx}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <Button
                onClick={() => handlePageChange("page", item)}
                variant={meta.current_page === item ? "default" : "outline"}
                className={cn(
                  "cursor-pointer rounded-none",
                  item === meta.current_page
                    ? "bg-baraka-lightgreen-200"
                    : "border-baraka-lightgreen-200",
                )}
              >
                {item}
              </Button>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              meta.current_page < meta.last_page &&
              handlePageChange("page", meta.current_page + 1)
            }
            className={cn(
              "bg-baraka-lightgreen-200 cursor-pointer rounded-none text-white hover:bg-black hover:text-white",
              meta.current_page === meta.last_page &&
                "border-baraka-lightgreen-200 pointer-events-none border bg-transparent text-black opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MyPagination;
