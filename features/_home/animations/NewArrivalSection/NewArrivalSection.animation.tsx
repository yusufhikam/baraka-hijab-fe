"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { SplitText } from "gsap/SplitText";
import animateSlideIn from "@/utils/animations/animateSlideIn";
import { useGSAP } from "@gsap/react";
import { JSX, useRef } from "react";
import {
  RESPONSIVE_MEDIA_QUERIES_CONTEXT,
  RESPONSIVE_MEDIA_QUERY_CONTEXT_TYPE,
} from "@/constants/responsive-media-query";
import animateFadeIn from "@/utils/animations/animateFadeIn";

type NewArrivalSectionAnimationProps = {
  children: React.ReactNode;
};

const NewArrivalSectionAnimation: React.FC<NewArrivalSectionAnimationProps> = ({
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const { current: scope } = wrapperRef;

      const aboutSectionWrapper = scope.querySelector(
        '[data-animate="about-section-wrapper"]',
      ) as HTMLElement;
      const newArrivalSectionWrapper = scope.querySelector(
        '[data-animate="new-arrival-section-wrapper"]',
      ) as HTMLElement;

      const newArrivalTitle = scope.querySelector(
        '[data-animate="new-arrival-title"]',
      ) as HTMLHeadingElement;

      const newArrivalTitleLink = scope.querySelector(
        '[data-animate="new-arrival-section-title-link"]',
      ) as HTMLAnchorElement;

      const newArrivalProducts = gsap.utils.toArray(
        scope.querySelectorAll('[data-animate="new-arrival-product"]'),
      ) as HTMLElement[];

      const counts = gsap.utils.toArray(
        scope.querySelectorAll('[data-animate="about-section-count"]'),
      ) as HTMLParagraphElement[];

      const motto = scope.querySelector(
        '[data-animate="about-section-moto"]',
      ) as HTMLParagraphElement;

      const socials = gsap.utils.toArray(
        scope.querySelectorAll('[data-animate="about-section-socials"]'),
      ) as HTMLButtonElement[];

      const splits: SplitText[] = [];

      const mm = gsap.matchMedia();

      mm.add(RESPONSIVE_MEDIA_QUERIES_CONTEXT, (context) => {
        const motoSplit = SplitText.create(motto, { type: "lines" });

        splits.push(motoSplit);

        const { isMobile } =
          context.conditions as RESPONSIVE_MEDIA_QUERY_CONTEXT_TYPE;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: isMobile ? newArrivalSectionWrapper : aboutSectionWrapper,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        document.fonts.ready.then(() => {
          if (!isMobile) {
            gsap.set(aboutSectionWrapper, { opacity: 1 });
            tl.from(aboutSectionWrapper, {
              opacity: 0,
              duration: 0.2,
            })
              .add(
                animateSlideIn({
                  target: motoSplit.lines,
                  ease: "expo.inOut",
                  direction: "vertical",
                  valueDirection: 100,
                  duration: 1,
                  toVars: { stagger: 0.3 },
                }),
                "-=0.5",
              )
              .add(
                animateSlideIn({
                  target: counts,
                  ease: "expo.inOut",
                  duration: 1,
                  valueDirection: 100,
                  toVars: { stagger: 0.5 },
                }),
                "-=0.8",
              )
              .add(
                animateSlideIn({
                  target: socials,
                  ease: "power3.inOut",
                  duration: 0.5,
                  // direction: "horizontal",
                  valueDirection: 50,
                  toVars: { stagger: 0.2 },
                }),
                "-=0.5",
              )
              .addLabel("afterSocials");
          }

          gsap.set(newArrivalTitle, { opacity: 1 });

          tl.add(
            animateFadeIn({
              target: newArrivalTitle,
              duration: 1,
              fromVars: { filter: "blur(10px)" },
              toVars: {
                filter: "blur(0px)",
                ease: "expo.out",
                // scrollTrigger: {
                //   trigger: newArrivalTitle,
                //   start: "top 80%",
                //   end: "bottom top",
                //   toggleActions: "play none none none",
                //   invalidateOnRefresh: true,
                // },
              },
            }),
          ).add(
            animateFadeIn({
              target: newArrivalTitleLink,
              duration: 1,
              fromVars: { filter: "blur(10px)" },
              toVars: { filter: "blur(0px)", ease: "expo.out" },
            }),
          );
          // .add(
          //   animateSlideIn({
          //     target: newArrivalProducts,
          //     direction: isMobile ? "horizontal" : "horizontal",
          //     duration: 1,
          //     ease: "expo.out",
          //     valueDirection: isMobile ? -100 : 100,
          //     toVars: { stagger: 0.2, scrollTrigger: newArrivalProducts },
          //   }),
          //   "-=0.5",
          // );
        });

        // if using useEffect (not useGSAP) is needed to kill the animation timeline for cleanup
        // return () => tl.kill();

        newArrivalProducts.forEach((p) => {
          // const direct = isMobile ? "x" : "y";
          gsap.from(p, {
            opacity: 0,
            x: 100,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: newArrivalSectionWrapper,
              start: "top 80%",
              end: "bottom top",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });
        });
      });

      // every time using match media or plugisn must be reverted for cleanup, because it's mutable DOM
      return () => {
        splits.forEach((s) => s.revert());
        mm.revert();
      };
    },
    { scope: wrapperRef },
  );

  return <div ref={wrapperRef}>{children}</div>;
};

export default NewArrivalSectionAnimation;
