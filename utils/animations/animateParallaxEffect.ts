import { gsap } from "@/lib/gsap/gsapConfig";
type ParallaxEffectProps = {
  target: HTMLElement | HTMLElement[] | null;
  container?: HTMLElement | null;
  speed?: number;
  scrub?: boolean | number;
  duration?: number;
};

export default function animateParallaxEffect({
  container, // parent wrapper or the element trigger
  target,
  speed = 0.2,
  scrub = 0.05,
  duration = 2,
}: ParallaxEffectProps) {
  if (!target) return;

  const safeHeight = (target as HTMLElement).offsetHeight || 100;
  const movement = -((safeHeight * speed) / 2);

  return gsap.to(target, {
    y: movement,
    duration,
    ease: "none",
    scrollTrigger: {
      trigger: container ?? target,
      start: "top bottom",
      end: "bottom top",
      scrub,
      invalidateOnRefresh: true,
    },
  });

  // return gsap.fromTo(
  //   target,
  //   {
  //     y: movement,
  //     ease: "none",
  //   },
  //   {
  //     y: 0,
  //     duration: duration,
  //     // animationDelay: 2,
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: container ?? target,
  //       start: "top bottom",
  //       end: "bottom top",
  //       scrub: scrub, // Smoothly links the animation to the scroll position
  //       invalidateOnRefresh: true,
  //     },
  //   },
  // );
}
