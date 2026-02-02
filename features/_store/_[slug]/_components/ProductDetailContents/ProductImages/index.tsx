"use client";

import { ProductType } from "@/entities/product/types/product.type";
import { storageBaseURL } from "@/lib/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import ProductPhotosCarousel from "../../../../_components/ProductPhotosCarousel";
import useMediaMatcher from "@/hooks/useMediaMatcher";
import usePauseLenis from "@/hooks/usePauseLenis";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ModalImageProduct = dynamic(
  () =>
    import(
      "@/features/_store/_[slug]/_components/ProductDetailContents/ProductImages/ModalImageProduct"
    ),
  { ssr: false },
);

type ProductImagesProps = {
  product: ProductType;
  activeVariantId: number;
  activeMainPhoto: string;
  onChangeMainPhoto: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProductImages({
  product,
  activeVariantId,
  activeMainPhoto,
  onChangeMainPhoto,
}: ProductImagesProps) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const { openModal, setOpenModal } = usePauseLenis();

  const variant = useMemo(() => {
    return product.product_variants.find((v) => v.id === activeVariantId);
  }, [activeVariantId, product.product_variants]);

  const isMobile = useMediaMatcher("(max-width: 640px)");
  const isDesktop = useMediaMatcher("(min-width: 1024px)");

  if (isMobile) {
    return <ProductPhotosCarousel photos={variant?.photos || []} />;
  }

  return (
    <section className="flex h-[60dvh] w-full grid-cols-6 flex-col justify-center gap-2 overflow-hidden sm:h-[80dvh] sm:flex-4 lg:grid lg:flex-row">
      <section className="main_image relative col-span-5 h-full hover:cursor-zoom-in">
        {isLoadingImage && (
          <div className="absolute flex aspect-video w-full animate-pulse items-center justify-center bg-zinc-300 sm:h-full" />
        )}

        <Image
          onClick={() => setOpenModal(true)}
          src={`${storageBaseURL}/${activeMainPhoto}`}
          alt={product.name}
          width={500}
          height={500}
          unoptimized
          priority
          className="aspect-video w-full cursor-zoom-in object-cover object-center sm:h-full"
          onLoad={() => setIsLoadingImage(false)}
        />

        <div className="absolute top-1/2 z-10 opacity-0">
          <ModalImageProduct
            photos={variant?.photos || []}
            isOpen={openModal}
            setIsOpen={setOpenModal}
          />
        </div>
      </section>

      {/* <section className="list_image col-span-1 flex gap-2 overflow-x-scroll lg:flex-col"> */}
      <Carousel
        orientation={isDesktop ? "vertical" : "horizontal"}
        opts={{ align: "start", containScroll: "trimSnaps" }}
      >
        <CarouselContent className="-ml-1 lg:ml-0 lg:max-h-[600px]">
          {isLoadingImage &&
            [1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="mb-4 flex aspect-square h-28 w-full animate-pulse items-center justify-center bg-zinc-300"
              />
            ))}

          {variant?.photos
            .filter((p) => p.photo !== activeMainPhoto)
            .map((photo, idx) => (
              <CarouselItem
                key={idx}
                className="list_image aspect-square basis-40 pl-1 lg:pl-0"
              >
                <Image
                  onClick={() => onChangeMainPhoto(photo.photo)}
                  // key={idx}
                  src={`${storageBaseURL}/${photo.photo}`}
                  alt={product.name}
                  width={100}
                  height={100}
                  unoptimized
                  priority
                  className="h-28 w-full object-cover object-bottom hover:cursor-pointer lg:h-full"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        {/* <CarouselPrevious className="absolute top-2/3 left-5 z-5 lg:-left-2/5" />
        <CarouselNext className="absolute right-5 bottom-1/6 -translate-y-1/2 lg:-left-2/5" /> */}
      </Carousel>
      {/* </section> */}
    </section>
  );
}
