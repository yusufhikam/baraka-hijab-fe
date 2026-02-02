"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
// import { gsap, SplitText } from "@/lib/gsap/gsapConfig";
import { gsap } from "@/lib/gsap/gsapConfig";
import { SplitText } from "gsap/SplitText";
import animateParallaxEffect from "@/utils/animations/animateParallaxEffect";
import animateSlideIn from "@/utils/animations/animateSlideIn";

type AnimatedHeroSectionProps = {
  children: React.ReactNode;
};
export default function HeroSectionAnimation({
  children,
}: AnimatedHeroSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const { current: scope } = wrapperRef;
      const tl = gsap.timeline();

      const sectionTitle = scope.querySelector(
        '[data-animate="hero-section-title"]',
      ) as HTMLHeadingElement;

      const sectionSubtitle = scope.querySelector(
        '[data-animate="hero-section-subtitle"]',
      ) as HTMLParagraphElement;

      const sectionBg = scope.querySelector(
        '[data-animate="hero-section-bg"]',
      ) as HTMLImageElement;

      let titleSplit, subtitleSplit;

      // gsap.set([sectionTitle, sectionSubtitle], {
      //   filter: "blur(0px)",
      //   opacity: 1,
      // });
      // document.fonts.ready.then(() => {
      SplitText.create(sectionTitle, {
        type: "lines",
        linesClass: "lines",
        autoSplit: true,
        onSplit: (self) => {
          titleSplit = animateSlideIn({
            target: self.lines,
            direction: "vertical",
            ease: "power3.inOut",
            duration: 1.5,
            fromVars: {
              filter: "blur(10px)",
            },
            toVars: {
              filter: "blur(0px)",
              stagger: 0.5,
            },
          });

          tl.add(titleSplit, "title").addLabel("afterTitle");

          return titleSplit;
        },
      });

      SplitText.create(sectionSubtitle, {
        type: "lines",
        linesClass: "lines",
        autoSplit: true,
        onSplit: (self) => {
          subtitleSplit = animateSlideIn({
            target: self.lines,
            direction: "vertical",
            ease: "power3.inOut",
            duration: 1.5,
            fromVars: {
              filter: "blur(10px)",
            },
            toVars: {
              filter: "blur(0px)",
              stagger: 0.5,
            },
          });

          tl.add(subtitleSplit, "afterTitle-=1.3");

          return subtitleSplit;
        },
      });
      // });

      animateParallaxEffect({
        target: sectionBg,
        container: scope,
        speed: 0.2,
      });

      return () => tl.kill();
    },
    { scope: wrapperRef },
  );

  return <div ref={wrapperRef}>{children}</div>;
}
