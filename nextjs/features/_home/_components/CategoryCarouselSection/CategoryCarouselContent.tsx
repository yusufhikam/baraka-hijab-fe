"use client";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SubCategoryCarouselType } from "@/entities/category/types/subCategory.type";
import { gsap } from "@/lib/gsap/gsapConfig";
import { storageBaseURL } from "@/lib/utils";
import animateSlideIn from "@/utils/animations/animateSlideIn";
import { useGSAP } from "@gsap/react";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import CategoryCarouselImageCard from "./CategoryCarousel.ImageCard";

const CategoryNamesCarousel = dynamic(() => import("./CategoryNamesCarousel"), {
  ssr: false,
});

type ProductCaraouselType = {
  subCategories: SubCategoryCarouselType[];
};
const CategoryCarouselContent = ({ subCategories }: ProductCaraouselType) => {
  const [api, setApi] = useState<CarouselApi>();
  // const [currentItem, setCurrentItem] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentSubCategory = useMemo(
    () => subCategories[activeIndex],
    [activeIndex, subCategories],
  );

  // get current photo product by current sub category
  const currentPhotoProduct = useMemo(() => {
    return (
      currentSubCategory.products[0].product_variants[0].photos[1].photo ?? ""
    );
  }, [currentSubCategory]);

  // get all sub category names
  const subCategoryNames = useMemo(
    () => subCategories.map((ctg) => ctg.name),
    [subCategories],
  );

  // get current sub category link
  const currentSubCategoryLink = useMemo(() => {
    return `/store?sub_category=${currentSubCategory.slug}`;
  }, [currentSubCategory]);

  // setup for get api of carousel
  useEffect(() => {
    if (!api) return;

    // set active index by selected scroll snap
    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setActiveIndex(index);
    };

    api.on("select", onSelect);

    onSelect(); // init

    return () => {
      api.off("select", onSelect);
    };
  }, [api, subCategories, currentSubCategory]);

  // animate on current photo change
  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const { current: scope } = wrapperRef;

      const productPhotoCardEl = scope.querySelector(
        ".product-carousel-content-item-img-wrapper",
      ) as HTMLDivElement;

      // if (!productPhotoCardEl) return;

      gsap.to(productPhotoCardEl, {
        opacity: 0,
        y: 100,
        duration: 0.2,
        onComplete: () => {
          animateSlideIn({
            target: productPhotoCardEl,
            direction: "vertical",
            duration: 0.5,
            ease: "power3.out",
            valueDirection: 100,
            toVars: { delay: 0.2 },
          });
        },
      });
    },
    { scope: wrapperRef, dependencies: [currentPhotoProduct] },
  );

  return (
    <div ref={wrapperRef} className="relative h-full w-full overflow-hidden">
      <CategoryNamesCarousel
        subCategoryNames={subCategoryNames}
        activeIndex={activeIndex}
        api={api}
      />

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
        }}
        className="z-2 h-full"
      >
        <CarouselContent className="relative ml-0 h-dvh w-full lg:h-[180dvh]">
          {subCategories.map((ctg) => (
            <CarouselItem
              key={ctg.id}
              className="cursor-grab pl-0 active:cursor-grabbing"
            >
              {/* <div className="absolute inset-0 z-2 bg-black/25" /> */}
              <ImageWithFallback
                data-animate="product-carousel-content-img"
                src={
                  `${storageBaseURL}/${ctg.products[0].thumbnail}` ||
                  "/svg/taken.svg"
                }
                alt={ctg.name}
                fill
                sizes="(min-width: 640px)100vw, 50vw"
                wraperClassName=" relative h-full w-full"
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          size={"icon-lg"}
          className="absolute top-1/2 left-10 -translate-y-full rounded-xs border-none bg-transparent text-white drop-shadow-lg drop-shadow-black/30"
        />
        <CarouselNext
          size={"icon-lg"}
          className="absolute top-1/2 right-10 -translate-y-full rounded-xs border-none bg-transparent text-white drop-shadow-lg drop-shadow-black/30"
        />
      </Carousel>

      {/* IMAGE CARD  */}
      <CategoryCarouselImageCard
        currentPhotoProduct={currentPhotoProduct}
        currentSubCategoryLink={currentSubCategoryLink}
      />
    </div>
  );
};

export default CategoryCarouselContent;
