"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductParamsQuery } from "@/entities/product/types/productParamQuery.type";
import buildQueryString from "@/utils/QueryBuilder";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

type PriceFilterProps = {
  min?: number;
  max?: number;
};

type PriceFilterFormProps = {
  value: string;
};
const PriceFilter: React.FC<PriceFilterFormProps> = ({ value }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [price, setPrice] = useState<PriceFilterProps>({});

  const updatePrice = useEffectEvent((price: PriceFilterProps) => {
    setPrice(price);
  });

  useEffect(() => {
    const maxPriceFromQuery = searchParams.get("max_price");
    const minPriceFromQuery = searchParams.get("min_price");

    updatePrice({
      min: minPriceFromQuery ? Number(minPriceFromQuery) : undefined,
      max: maxPriceFromQuery ? Number(maxPriceFromQuery) : undefined,
    });
  }, [searchParams]);

  const onSubmitFilter = (e: React.FormEvent) => {
    e.preventDefault();

    const query: ProductParamsQuery = {
      min_price: price.min,
      max_price: price.max,
    };

    router.push(`/store?${buildQueryString(query)}`, { scroll: false });
  };

  return (
    <AccordionItem value={value}>
      <AccordionTrigger>Price</AccordionTrigger>
      <AccordionContent className="w-full p-2">
        <form onSubmit={onSubmitFilter} className="space-y-4">
          <div className="font-geist inline-flex w-full items-center justify-between gap-2">
            <Input
              value={price.min ?? ""}
              onChange={(e) =>
                setPrice((prev) => ({
                  ...prev,
                  min: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              type="number"
              placeholder="Min. Price"
              className="focus-visible:ring-baraka-primary-300 rounded-xs border-black font-semibold placeholder:font-semibold"
            />
            <span>—</span>
            <Input
              value={price.max ?? ""}
              onChange={(e) =>
                setPrice((prev) => ({
                  ...prev,
                  max: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              type="number"
              placeholder="Max. Price"
              className="focus-visible:ring-baraka-primary-300 rounded-xs border-black font-semibold placeholder:font-semibold"
            />
          </div>

          <Button type="submit" className="w-full rounded-none">
            Apply
          </Button>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PriceFilter;
