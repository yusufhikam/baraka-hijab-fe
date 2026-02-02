"use client";
import { gsap } from "@/lib/gsap/gsapConfig";
// import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type TransitionProviderProps = {
  children: React.ReactNode;
};

const TransitionProvider: React.FC<TransitionProviderProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const transitionWrapper = useRef<HTMLDivElement>(null);
  const [currentPath, setCurrentPath] = useState(pathname);
  const [displayChildren, setDisplayChildren] = useState(children);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (pathname === currentPath) return;
    if (!transitionWrapper.current) return;
    if (isAnimating.current) return;

    isAnimating.current = true;

    const { current: scope } = transitionWrapper;

    gsap.to(scope, {
      yPercent: -100,
      scale: 0.8,
      duration: 1,
      //   delay: 0.5,
      opacity: 0,
      ease: "power3.inOut",
      onComplete: () => {
        setCurrentPath(pathname);
        setDisplayChildren(children);

        gsap.fromTo(
          scope,
          {
            yPercent: 100,
            scale: 0.8,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          },
        );
      },
    });
  }, [children, pathname, currentPath]);

  return (
    <div className="will-change-transform" ref={transitionWrapper}>
      {displayChildren}
    </div>
  );
};

export default TransitionProvider;
