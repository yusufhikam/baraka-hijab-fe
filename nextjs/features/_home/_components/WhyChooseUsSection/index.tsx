"use client";

import ImageWithFallback from "@/components/common/ImageWithFallback";
import {
  WHY_CHOOSE_US_IMAGES,
  WHY_CHOOSE_US_ITEMS,
} from "@/constants/why-choose-us";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
// import { gsap } from "@/lib/gsap/gsapConfig";
import { gsap, SplitText } from "@/lib/gsap/gsapConfig";
import { CarouselApi } from "@/components/ui/carousel";
import WhyChooseUsSectionCarousel from "./WhyChooseUsSection.Carousel";
import animateSlideIn from "@/utils/animations/animateSlideIn";

const WhyChooseUsSection = forwardRef<HTMLElement>((_, ref) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentItem, setCurrentItem] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // setup for Carousel API
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      try {
        const index = carouselApi.selectedScrollSnap();
        setCurrentItem(index);
      } catch (err) {
        console.error(err);
      }
    };

    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const currentItemTitle = WHY_CHOOSE_US_ITEMS[currentItem].title;
  const currentItemSubTitle = WHY_CHOOSE_US_ITEMS[currentItem].subtitle;

  // setup for content gsap animation that needed for carousel api to work
  useGSAP(
    () => {
      if (!contentRef.current) return;

      const { current: scope } = contentRef;
      const title = scope.querySelector(
        `[data-animate="why-us-content-title"]`,
      );
      const subtitle = scope.querySelector(
        `[data-animate="why-us-section-content-subtitle"]`,
      );

      const tl = gsap.timeline();

      const subtitleSplit = SplitText.create(subtitle, {
        type: "lines,words",
        linesClass: "split-line",
        // position: "absolute",
      });

      document.fonts.ready.then(() => {
        // gsap.set([title, subtitle], { y: 100, opacity: 0 });
        tl.add(
          animateSlideIn({
            target: title,
            direction: "vertical",
            ease: "power3.out",
            duration: 1,
            valueDirection: 100,
          }),
        ).add(
          animateSlideIn({
            target: subtitleSplit.lines,
            direction: "vertical",
            ease: "power3.out",
            duration: 1,
            valueDirection: 100,
            toVars: {
              stagger: 0.1,
              opacity: 1,
            },
          }),
          "-=0.5",
        );
      });

      return () => {
        tl.kill();
        subtitleSplit.revert();
      };
    },
    { scope: contentRef, dependencies: [currentItem] },
  );

  return (
    <section
      ref={ref}
      className="xs:mb-0 xs:py-20 mb-10 min-h-screen px-5 py-10 md:px-10"
    >
      <div className="relative flex flex-col items-center justify-between gap-5 sm:flex-row sm:items-start">
        <WhyChooseUsSectionCarousel setCarouselApi={setCarouselApi} />

        <div className="flex flex-1 flex-col items-start justify-between gap-5 sm:w-1/3">
          <div className="hidden aspect-square w-full items-center gap-5 overflow-hidden sm:flex">
            {WHY_CHOOSE_US_IMAGES.slice(0, 3).map((item, idx) => (
              <ImageWithFallback
                data-animate="why-us-child-img"
                key={idx}
                src={item.path}
                fill
                sizes="(min-width: 640px) 33vw"
                alt="image"
                wraperClassName="h-full w-full relative aspect-square"
                className="object-cover object-top"
              />
            ))}
          </div>

          <div
            ref={contentRef}
            data-animate="why-us-content"
            className="mt-3 w-full space-y-3 sm:mt-0"
          >
            <h3
              data-animate="why-us-content-title"
              className="text-3xl font-bold uppercase"
            >
              {currentItemTitle}
            </h3>
            <div className="why-us-section-content-subtitle-wrapper overflow-hidden">
              <p
                data-animate="why-us-section-content-subtitle"
                className="text-justify"
              >
                {/* <span
                  data-animate="why-us-section-content-subtitle"
                  className="why-us-section-content-subtitle-inner"
                > */}
                {currentItemSubTitle}
                {/* </span> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseUsSection.displayName = "WhyChooseUsSection";

export default WhyChooseUsSection;
