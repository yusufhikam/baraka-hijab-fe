import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SubCategoryType } from "@/entities/category/types/subCategory.type";
import { cn } from "@/lib/utils";
import React from "react";

type CategoryNamesProps = {
  subCategoryNames: SubCategoryType["name"][];
  activeIndex?: number;
  api?: CarouselApi;
};

const CategoryNamesCarousel: React.FC<CategoryNamesProps> = ({
  subCategoryNames,
  activeIndex,
  api,
}) => {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="absolute top-5 left-1/2 z-3 inline-flex w-full -translate-x-1/2 items-center justify-center gap-5"
    >
      <CarouselContent className="-ml-4">
        {subCategoryNames.map((name, idx) => (
          <CarouselItem key={idx} className="basis-auto pl-4">
            <Button
              variant={"link"}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "w-fit cursor-pointer font-medium text-white text-shadow-black/30 text-shadow-lg",
                activeIndex === idx && "underline",
              )}
            >
              {name}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategoryNamesCarousel;
