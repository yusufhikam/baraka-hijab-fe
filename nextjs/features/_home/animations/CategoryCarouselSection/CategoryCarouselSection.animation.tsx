"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import animateProductCarouselSection from "./animations";
import {
  RESPONSIVE_MEDIA_QUERIES_CONTEXT,
  RESPONSIVE_MEDIA_QUERY_CONTEXT_TYPE,
} from "@/constants/responsive-media-query";
import animateParallaxEffect from "@/utils/animations/animateParallaxEffect";

type AnimatedProductCarouselSectionProps = {
  children: React.ReactNode;
};

const { animateParallaxCarouselImage } = animateProductCarouselSection;

export default function CategoryCarouselSectionAnimation({
  children,
}: AnimatedProductCarouselSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      const { current: scope } = wrapperRef;

      const carouselContentImage = gsap.utils.toArray(
        scope.querySelectorAll('[data-animate="product-carousel-content-img"]'),
      ) as HTMLImageElement[];

      const carouselContentProductImage = scope.querySelector(
        '[data-animate="product-carousel-content-item-img"]',
      ) as HTMLImageElement;

      // const tl = gsap.timeline();

      const mm = gsap.matchMedia();

      mm.add(RESPONSIVE_MEDIA_QUERIES_CONTEXT, (context) => {
        const { isMobile } =
          context.conditions as RESPONSIVE_MEDIA_QUERY_CONTEXT_TYPE;

        // animate parallax for carousel images
        carouselContentImage.forEach((img) => {
          animateParallaxEffect({
            // container: scope,
            target: img,
            speed: isMobile ? -0.05 : 0.1,
          });
        });

        // animate parallax for product image card
        animateParallaxCarouselImage({
          // container: scope,
          target: carouselContentProductImage,
          speed: isMobile ? 0.3 : -0.3,
        });

        gsap.quickSetter(carouselContentProductImage, "y", "px");

        const subSectionWrapper = document.querySelector(
          '[data-animate="subs-section-wrapper"]',
        ) as HTMLElement;

        // ScrollTrigger.create({
        //   trigger: scope,
        //   start: "center 60%",
        //   end: "bottom top",
        //   scrub: true,
        //   pin: true,
        //   pinSpacing: false,
        // });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: wrapperRef, dependencies: [] },
  );

  return <div ref={wrapperRef}>{children}</div>;
}
