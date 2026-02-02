"use client";

import { useEffect, useRef } from "react";

type InfiniteCursorScrollTriggerProps = {
  hasMore: boolean;
  onIntersect?: () => void;
};

const InfiniteCursorScrollTrigger: React.FC<
  InfiniteCursorScrollTriggerProps
> = ({ hasMore, onIntersect }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const wrapperRef = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && onIntersect) onIntersect();
      },
      { threshold: 1.0 },
    );

    if (wrapperRef) observer.observe(wrapperRef);

    return () => {
      if (wrapperRef) observer.unobserve(wrapperRef);
    };
  }, [hasMore, onIntersect]);

  return <div ref={ref} className="h-1" />;
};

export default InfiniteCursorScrollTrigger;
