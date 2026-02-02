import { gsap } from "@/lib/gsap/gsapConfig";

type AnimateFadeInProps = {
  target: gsap.TweenTarget;
  duration?: number;
  fromVars?: gsap.TweenVars;
  toVars?: gsap.TweenVars;
};

const animateFadeIn = ({
  target,
  duration = 1,
  fromVars = {},
  toVars = {},
}: AnimateFadeInProps) => {
  gsap.set(target, {
    opacity: 0,
  });

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      ...fromVars,
    },
    {
      opacity: 1,

      duration: duration,
      ease: "power2.out",
      ...toVars,
    },
  );
};

export default animateFadeIn;
