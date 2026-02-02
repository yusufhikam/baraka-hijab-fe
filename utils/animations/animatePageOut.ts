import { gsap } from "@/lib/gsap/gsapConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function animatePageOut(
  href: string,
  router: AppRouterInstance,
) {
  const transitionWrapper = document.querySelector(
    '[data-animate="spa-wrapper"]',
  ) as HTMLDivElement;

  if (transitionWrapper) {
    const tl = gsap.timeline();

    tl.set(transitionWrapper, {
      xPercent: -100,
    }).to(transitionWrapper, {
      xPercent: 0,
      duration: 0.8,
      onComplete: () => router.push(href, { scroll: false }),
    });
  }
}
