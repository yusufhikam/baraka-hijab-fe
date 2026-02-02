import { gsap } from "@/lib/gsap/gsapConfig";
type AnimateSlideInProps = {
  target: HTMLElement | HTMLElement[] | Element | Element[] | null;
  valueDirection?: number;
  ease?: gsap.EaseFunction | gsap.EaseString;
  direction?: "vertical" | "horizontal";
  duration?: number;
  fromVars?: gsap.TweenVars;
  toVars?: gsap.TweenVars;
};

export default function animateSlideIn({
  target,
  duration = 1,
  fromVars = {},
  toVars = {},
  valueDirection = 50,
  ease = "none",
  direction = "vertical",
}: AnimateSlideInProps) {
  const direct = direction === "vertical" ? "y" : "x";

  gsap.set(target, {
    [direct]: valueDirection,
    opacity: 0,
    // visibility: "visible",
  });

  return gsap.fromTo(
    target,
    {
      [direct]: valueDirection,
      opacity: 0,
      // visibility: "visible",
      ...fromVars,
    },
    {
      [direct]: 0,
      opacity: 1,
      duration: duration,
      ease: ease,
      clearProps: "transform",
      ...toVars,
    },
  );

  // switch (type) {
  //   case "in":
  //     return gsap.from(target, {
  //       [direct]: valueDirection,
  //       opacity: 0,
  //       ease: ease,
  //       duration: duration,
  //       ...fromVars,
  //     });
  //   case "out":
  //     return gsap.to(target, {
  //       [direct]: valueDirection,
  //       opacity: 0,
  //       ease: ease,
  //       duration: duration,
  //       ...toVars,
  //     });

  //   case "both":
  //     return gsap.fromTo(
  //       target,
  //       {
  //         [direct]: valueDirection,
  //         opacity: 0,
  //         ...fromVars,
  //       },
  //       {
  //         [direct]: 0,
  //         opacity: 1,
  //         duration: duration,
  //         ease: ease,
  //         ...toVars,
  //       },
  //     );
  // }
}
