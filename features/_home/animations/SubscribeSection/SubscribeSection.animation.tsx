"use client";

import {
  RESPONSIVE_MEDIA_QUERIES_CONTEXT,
  RESPONSIVE_MEDIA_QUERY_CONTEXT_TYPE,
} from "@/constants/responsive-media-query";
import { gsap } from "@/lib/gsap/gsapConfig";
import animateParallaxEffect from "@/utils/animations/animateParallaxEffect";
import animateSlideIn from "@/utils/animations/animateSlideIn";
import { useGSAP } from "@gsap/react";
import { PropsWithChildren, useRef } from "react";
import animateSubscribeSection from "./animations";

const {
  animateSectionBgImages,
  animateGetStartedWrapper,
  animateSectionSteps,
} = animateSubscribeSection;

const SubscribeSectionAnimation: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const { current: scope } = wrapperRef;
      const sectionBgImagesWrapper = gsap.utils.toArray(
        scope.querySelectorAll(".subs-section-img-wrapper"),
      ) as HTMLDivElement[];
      //   animate only one image on mobile only
      const sectionBgImage = scope.querySelector(
        ".subs-section-img",
      ) as HTMLImageElement;

      const sectionBgImageTopPriority = scope.querySelector(
        ".subs-section-img-top",
      ) as HTMLImageElement;

      const sectionTitles = gsap.utils.toArray(
        scope.querySelectorAll('[data-animate="subs-section-title"]'),
      ) as HTMLHeadingElement[];

      const sectionSteps = gsap.utils.toArray(
        scope.querySelectorAll('[data-animate="subs-section-steps"]'),
      ) as HTMLDivElement[];

      const getStartedWrapper = scope.querySelector(
        '[data-animate="subs-section-get-started"]',
      ) as HTMLDivElement;

      const mm = gsap.matchMedia();

      mm.add(RESPONSIVE_MEDIA_QUERIES_CONTEXT, (context) => {
        const { isMobile } =
          context.conditions as RESPONSIVE_MEDIA_QUERY_CONTEXT_TYPE;

        //   animate on all devices size except on mobile
        if (!isMobile) {
          // animate parallax effect for each card images
          animateSectionBgImages(sectionBgImagesWrapper);

          // animate parallax for top priority image
          animateParallaxEffect({
            target: sectionBgImageTopPriority,
            speed: -3,
            container: scope,
            // duration: 3,
          });

          //   animate section steps
          animateSectionSteps(sectionSteps, scope);

          //   animate section get started wrapper
          animateGetStartedWrapper(
            getStartedWrapper,
            sectionBgImageTopPriority,
          );
        }

        // animate on mobile only
        if (isMobile) {
          animateParallaxEffect({
            target: sectionBgImage,
            speed: -0.2,
          });
        }

        // animate all devices size without blocking conditions

        // animate section titles
        sectionTitles.forEach((item, idx) => {
          const fromDirectValue = idx % 2 === 0 ? -100 : 100;

          animateSlideIn({
            target: item,
            direction: "horizontal",
            valueDirection: fromDirectValue,
            ease: "power3.out",
            toVars: {
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom top",
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            },
          });
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: wrapperRef },
  );

  return <div ref={wrapperRef}>{children}</div>;
};

export default SubscribeSectionAnimation;
