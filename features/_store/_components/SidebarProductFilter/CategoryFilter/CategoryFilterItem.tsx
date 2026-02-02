"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CategoryType } from "@/entities/category/types/category.type";
import { ProductParamsQuery } from "@/entities/product/types/productParamQuery.type";
import { cn } from "@/lib/utils";
import updateSearchParams from "@/utils/updateSearchParams";
import { Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity, memo, useState } from "react";

type CategoryFilterItemProps = {
  category: CategoryType;
};

const CategoryFilterItem: React.FC<CategoryFilterItemProps> = ({
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const IconTrigger = isOpen ? Minus : Plus;

  const searchParams = useSearchParams();
  const router = useRouter();
  const onClickCategory = (key: keyof ProductParamsQuery, value: string) => {
    router.push(`/store?${updateSearchParams({ searchParams, key, value })}`, {
      scroll: false,
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "inline-flex w-full items-center justify-between border-b pb-1 transition-colors duration-200",
            !isOpen ? "border-b-black" : "border-b-black/0 font-semibold",
          )}
        >
          <Button
            variant={"ghost"}
            onClick={() => onClickCategory("category", category.slug)}
            className="hover:text-baraka-primary-300 cursor-pointer hover:bg-transparent"
          >
            {category.name}
          </Button>
          <Activity
            mode={
              category.subCategories && category.subCategories.length > 0
                ? "visible"
                : "hidden"
            }
          >
            <IconTrigger className="size-3" />
          </Activity>
        </div>
      </CollapsibleTrigger>

      <Activity
        mode={
          category.subCategories && category.subCategories.length > 0
            ? "visible"
            : "hidden"
        }
      >
        <CollapsibleContent className="flex flex-col gap-1 py-1 ps-3">
          {category.subCategories?.map((subCtg, idx) => (
            <Button
              variant={"ghost"}
              onClick={() => onClickCategory("sub_category", subCtg.slug)}
              key={idx}
              className="hover:text-baraka-primary-300 inline-flex cursor-pointer items-center justify-start gap-2 text-zinc-600"
            >
              <div className="size-1 bg-black" /> {subCtg.name}
            </Button>
          ))}
        </CollapsibleContent>
      </Activity>
    </Collapsible>
  );
};

export default memo(CategoryFilterItem);
