"use client";

import { useEffect, useRef } from "react";
import ReactLenis, { LenisRef } from "lenis/react";
// import { gsap } from "@/lib/gsap/gsapConfig";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { SplitText } from "gsap/SplitText";
import { gsap } from "@/lib/gsap/gsapConfig";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  // Lenis Setup for GSAP
  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(update);
    // gsap.ticker.fps(60);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  //   GSAP Setup
  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    // lenis scrollTo top when route change
    lenisRef.current?.lenis?.scrollTo(0, {
      immediate: true,
    });

    // refresh ScrollTrigger
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false, // * if use GSAP set to FALSE
        lerp: 0.1, // * 0 - 1, too many = too fast
        duration: 1.5,
        syncTouch: true,
        overscroll: true,
        smoothWheel: true,
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
