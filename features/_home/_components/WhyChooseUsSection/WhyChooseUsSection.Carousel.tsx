import ImageWithFallback from "@/components/common/ImageWithFallback";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WHY_CHOOSE_US_ITEMS } from "@/constants/why-choose-us";
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";
import { Dispatch, SetStateAction, useRef } from "react";
import { Fragment } from "react/jsx-runtime";

type WhyChooseUsSectionCarouselProps = {
  setCarouselApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
};
const WhyChooseUsSectionCarousel: React.FC<WhyChooseUsSectionCarouselProps> = ({
  setCarouselApi,
}) => {
  const isMobile = useIsMobile();

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  //   enable carousel autoplay only on mobile
  const autoPlayOnlyOnMobile = () => {
    if (isMobile) {
      return plugin.current.play();
    } else {
      return plugin.current.stop();
    }
  };

  return (
    <Carousel
      data-animate="why-us-carousel"
      setApi={setCarouselApi}
      opts={{ align: "start", dragFree: false, loop: isMobile }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={autoPlayOnlyOnMobile}
      className="static aspect-2/3 w-full flex-2 overflow-hidden p-0 sm:w-2/3 lg:aspect-square"
    >
      <div className="xs:justify-between xs:-top-16 absolute top-[105%] right-0 z-2 flex w-full items-center justify-center gap-5">
        <h2
          data-animate="why-us-section-title"
          className="xs:block hidden text-xl"
        >
          The Reason Baraka Hijab is Different
        </h2>

        <div className="xs:me-15 relative">
          <CarouselPrevious
            data-animate="why-us-section-carousel-button"
            variant={"default"}
            size={"icon-lg"}
            className="xs:-top-4 xs:translate-y-0 rounded-none"
          />
          <CarouselNext
            data-animate="why-us-section-carousel-button"
            variant={"default"}
            size={"icon-lg"}
            className="xs:-top-4 xs:translate-y-0 rounded-none"
          />
        </div>
      </div>

      <CarouselContent
        data-animate="why-us-section-carousel-content"
        className="ml-0 h-full items-center justify-between"
      >
        {WHY_CHOOSE_US_ITEMS.map((item) => (
          <Fragment key={item.id}>
            <CarouselItem className="aspect-2/3 w-full basis-full cursor-grab pl-0 active:cursor-grabbing">
              <ImageWithFallback
                data-animate="why-us-carousel-img"
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 70vw"
                variant="pulse"
                wraperClassName="h-full w-full relative"
                className="object-cover object-center"
              />
            </CarouselItem>
          </Fragment>
        ))}
      </CarouselContent>

      {/* <div className="font-poppins xs:block absolute top-1/2 right-1/3 z-2 hidden h-fit w-1/4 bg-black py-2 opacity-50">
            <h3
              data-animate="why-us-carousel-title"
              className={`bg-clip-text text-center text-5xl font-bold text-transparent mix-blend-difference [-webkit-text-stroke:white_2px]`}
            >
              {currentItemTitle}
            </h3>
          </div> */}
    </Carousel>
  );
};

export default WhyChooseUsSectionCarousel;
