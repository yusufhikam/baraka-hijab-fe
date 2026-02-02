import { gsap } from "@/lib/gsap/gsapConfig";

const animateWhyChooseUsSection = {
  animateSectionTitle: (target: Element | null) => {
    return gsap.fromTo(
      target,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      },
    );
  },
  animateImageParallax: (
    target: HTMLElement | HTMLElement[] | null,
    container: HTMLElement,
    speed: number,
  ) => {
    const movement = -((target as HTMLElement).offsetHeight * speed);
    return gsap.fromTo(
      target,
      {
        y: movement,
      },
      {
        y: 0,
        duration: 2,
        animationDelay: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // Smoothly links the animation to the scroll position
          invalidateOnRefresh: true,
        },
      },
    );
  },

  animateSectionContent: (target: Element | null) => {
    return gsap.from(target, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  },

  animateScrollHorizontal: ({
    target,
    valueX = 500,
  }: {
    target: Element | Element[] | null;
    valueX?: number;
  }) => {
    const isTargetArray = Array.isArray(target);

    return gsap.to(target, {
      x: valueX,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: target,
        start: "top center",
        end: () => "+=500",
        scrub: true,
      },
    });
  },
};

export default animateWhyChooseUsSection;
