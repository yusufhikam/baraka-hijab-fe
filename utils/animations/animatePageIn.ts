import { RefObject } from "react";
import { gsap } from "@/lib/gsap/gsapConfig";
const animatePageIn = () => {
  const transitionWrapper = document.querySelector(
    '[data-animate="spa-wrapper"]',
  );

  if (transitionWrapper) {
    const tl = gsap.timeline();

    tl.set(transitionWrapper, {
      xPercent: 0,
    }).to(transitionWrapper, {
      xPercent: 100,
      duration: 0.8,
    });
  }
};

export default animatePageIn;
