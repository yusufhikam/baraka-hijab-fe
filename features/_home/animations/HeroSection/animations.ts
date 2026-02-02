// import { gsap } from "@/lib/gsap/gsapConfig";
import { gsap } from "@/lib/gsap/gsapConfig";

export const animateHeroTitle = (target: gsap.TweenTarget) => {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      // yPercent: 200,
      filter: "blur(10px)",
    },
    {
      opacity: 1,
      // yPercent: 0,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power3",
      stagger: 0.5,
    },
  );
};
