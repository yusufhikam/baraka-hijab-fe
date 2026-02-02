"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type DateCountDownProps = {
  date: string | null;
  className?: string;
};

const DateCountDown: React.FC<DateCountDownProps> = ({ date, className }) => {
  // console.log("🚀 ~ DateCountDown ~ date:", date);
  const timeDisplay = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // console.log("🚀 ~ DateCountDown ~ date:", date);
    if (!date) return;

    const normalizedDate = date.includes("T") ? date : date.replace(" ", "T");
    // console.log("🚀 ~ DateCountDown ~ normalizedDate:", normalizedDate);

    const updateCountDown = () => {
      const now = new Date().getTime();
      // console.log("🚀 ~ updateCountDown ~ now:", now);
      const end = new Date(normalizedDate).getTime();
      // console.log("🚀 ~ updateCountDown ~ end:", end);
      const diff = end - now;
      // console.log("🚀 ~ updateCountDown ~ diff:", diff);

      if (isNaN(end)) {
        if (timeDisplay.current) {
          timeDisplay.current.textContent = "Invalid Date";
        }
        return;
      }

      if (diff <= 0) {
        if (timeDisplay.current) {
          timeDisplay.current.textContent = "Expired";
        }

        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      console.log("🚀 ~ updateCountDown ~ formattedTime:", formattedTime);

      if (timeDisplay.current) {
        timeDisplay.current.textContent = formattedTime;
      }
    };

    updateCountDown(); //initial call
    const interval_id = setInterval(updateCountDown, 1000);

    return () => clearInterval(interval_id);
  }, [date]);

  return (
    <span ref={timeDisplay} aria-live="polite" className={cn(className)}></span>
  );
};

export default DateCountDown;
