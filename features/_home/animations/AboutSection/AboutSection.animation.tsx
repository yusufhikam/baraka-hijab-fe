"use client";

import { SplitText } from "@/lib/gsap/gsapConfig";
import animateSlideIn from "@/utils/animations/animateSlideIn";
import { useGSAP } from "@gsap/react";
import { PropsWithChildren, useRef } from "react";

const AboutSectionAnimation: React.FC<PropsWithChildren> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const { current: scope } = wrapperRef;

      const aboutTitle = scope.querySelector(
        '[data-animate="about-section-title"]',
      ) as HTMLHeadingElement;

      const aboutTitleSplit = SplitText.create(aboutTitle, {
        type: "lines",
        linesClass: "split-line",
      });

      //   animate after fonts are loaded
      document.fonts.ready.then(() => {
        animateSlideIn({
          target: aboutTitleSplit.lines,
          duration: 1.5,
          direction: "vertical",
          ease: "expo.inOut",
          valueDirection: 100,
          toVars: {
            stagger: 0.5,
            scrollTrigger: {
              trigger: scope,
              start: "top 70%",
              end: "bottom top",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          },
        });
      });

      return () => {
        aboutTitleSplit.revert();
      };
    },

    { scope: wrapperRef },
  );

  return <div ref={wrapperRef}>{children}</div>;
};

export default AboutSectionAnimation;
