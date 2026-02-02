"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";
import animateWhyChooseUsSection from "./animations";
import dynamic from "next/dynamic";
import animateParallaxEffect from "@/utils/animations/animateParallaxEffect";
import animateSlideIn from "@/utils/animations/animateSlideIn";

const WhyChooseUsSection = dynamic(
  () => import("@/features/_home/_components/WhyChooseUsSection"),
  // { loading: () => <p>Loading...</p> },
);

const { animateScrollHorizontal } = animateWhyChooseUsSection;
type matchMedia = {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
};
export default function WhyChooseUsSectionAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const { current: scope } = sectionRef;

      const mm = gsap.matchMedia();

      const carouselContent = scope.querySelector(
        '[data-animate="why-us-section-carousel-content"]',
      ) as HTMLDivElement;

      const carouselImages = gsap.utils.toArray(
        scope.querySelectorAll('[data-animate="why-us-carousel-img"]'),
      ) as HTMLElement[];

      const carouselChildImages = gsap.utils.toArray(
        scope.querySelectorAll('[data-animate="why-us-child-img"]'),
      ) as HTMLImageElement[];

      const whyUsSectionTitle = scope.querySelector(
        '[data-animate="why-us-section-title"]',
      ) as HTMLHeadingElement;

      const carouselButtons = gsap.utils.toArray(
        scope.querySelectorAll(
          '[data-animate="why-us-section-carousel-button"]',
        ),
      ) as HTMLButtonElement[];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 80%",
          end: "bottom top",
        },
      });

      tl.add(
        animateSlideIn({
          target: whyUsSectionTitle,
          duration: 1,
          ease: "power4.inOut",
          direction: "vertical",
          valueDirection: 100,
        }),
      )
        .add(
          animateSlideIn({
            target: carouselButtons,
            duration: 1,
            ease: "power4.inOut",
            direction: "vertical",
            valueDirection: 100,
            toVars: {
              stagger: 0.2,
            },
          }),
          "-=1",
        )
        .add(
          animateSlideIn({
            target: carouselContent,
            duration: 1.5,
            ease: "power4.inOut",
            direction: "vertical",
            valueDirection: 100,
          }),
          "-=0.5",
        )
        .add(
          animateSlideIn({
            target: carouselChildImages,
            duration: 1.5,
            ease: "power4.inOut",
            direction: "vertical",
            valueDirection: 100,
          }),
          "-=0.5",
        );

      mm.add(
        {
          isMobile: "(max-width: 640px)",
          isTablet: "(min-width: 641px) and (max-width: 1023px)",
          isLaptop: "(min-width: 1024px) and (max-width: 1279px)",
          isDesktop: "(min-width: 1280px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions as matchMedia;

          carouselImages.forEach((img) =>
            animateParallaxEffect({
              container: scope,
              target: img,
              speed: isMobile ? -0.2 : 0.2,
            }),
          );
          // animate only on min tablet
          if (!isMobile) {
            animateScrollHorizontal({
              target: carouselChildImages,
              valueX: isTablet
                ? -500
                : -(window.innerWidth * 2) / carouselChildImages.length,
            });
          }

          return () => {
            tl.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return <WhyChooseUsSection ref={sectionRef} />;
}
