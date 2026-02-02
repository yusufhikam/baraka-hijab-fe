import animateFadeIn from "@/utils/animations/animateFadeIn";
import animateParallaxEffect from "@/utils/animations/animateParallaxEffect";

const animateSubscribeSection = {
  animateSectionBgImages: (target: HTMLElement[]) => {
    return target.forEach((item, idx) => {
      const evenIndex = idx % 2 === 0 ? 0.25 : -0.25;
      const speed = (idx + 1) * evenIndex;
      const duration = idx + 1.5 * 0.3;

      animateParallaxEffect({
        target: item,
        speed: speed,
        duration: duration,
        scrub: true,
      });
    });
  },

  animateGetStartedWrapper: (target: HTMLElement, trigger: HTMLElement) => {
    return animateFadeIn({
      target: target,
      duration: 1,
      fromVars: {
        opacity: 1,
        filter: "blur(10px)",
        clipPath: "inset(0 0 100% 0)",
      },
      toVars: {
        filter: "blur(0px)",
        clipPath: "inset(0 0 0% 0)",
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: trigger, // bg image top priority
          start: "90% 20%",
          end: "bottom top",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
          // markers: true,
        },
      },
    });
  },
  animateSectionSteps: (target: HTMLElement[], trigger: HTMLElement) => {
    return animateFadeIn({
      target: target,
      duration: 1,
      fromVars: {
        filter: "blur(10px)",
      },
      toVars: {
        filter: "blur(0px)",
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      },
    });
  },
};

export default animateSubscribeSection;
