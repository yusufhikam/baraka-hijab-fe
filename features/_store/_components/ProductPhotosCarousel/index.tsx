"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import { PhotoType } from "@/entities/photo/type/photo.type";

type ProductPhotosCarouselProps = {
  photos: PhotoType[];
};

function ProductPhotosCarousel({ photos }: ProductPhotosCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentImage, setCurrentImage] = useState(1);

  const [countImage, setCountImage] = useState(photos.length);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      try {
        const index = api.selectedScrollSnap();
        setCurrentImage(index + 1);
        setCountImage(photos.length);
      } catch (err) {
        console.error("🚀 ~ onSelect ~ err:", err);
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, photos.length]);

  return (
    <>
      <Carousel
        //   opts={{
        //     active: duringDrag ? false : true,
        //   }}
        setApi={setApi}
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
      >
        <h2 className="font-geist-mono absolute top-5 left-1/2 z-2 hidden -translate-x-1/2 font-semibold text-white sm:left-0 sm:block sm:translate-x-0 sm:text-xl">
          [{currentImage}/{countImage}]
        </h2>
        <CarouselContent className="-ml-1 h-full">
          {photos.map((photo, idx) => (
            <CarouselItem key={idx} className="m-auto pl-1">
              <ProductImage photo={photo} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {currentImage !== 1 && (
          <CarouselPrevious className="bottom-1/2 left-5 sm:left-20" />
        )}

        {currentImage !== countImage && (
          <CarouselNext className="right-5 bottom-1/2 sm:right-20" />
        )}
      </Carousel>

      {/* modal product image on mobile */}

      {/* <ModalImageProduct />  */}
    </>
  );
}

export default ProductPhotosCarousel;
