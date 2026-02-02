"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image, { ImageProps } from "next/image";
import React, { Activity, useState } from "react";

const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

type ImageWithFallbackProps = Omit<ImageProps, "src" | "alt"> & {
  fallbackSrc?: string;
  variant?: "spin" | "pulse";
  src?: string;
  alt?: string;
  wraperClassName?: HTMLDivElement["className"];
  fillImage?: boolean;
};
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  fallbackSrc = "/svg/taken.svg",
  variant = "spin",
  alt = "image",
  src,
  wraperClassName,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className={cn("relative h-auto w-fit", wraperClassName)}>
      <Image
        {...props}
        loader={imageLoader}
        src={src || fallbackSrc}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        // unoptimized
      />

      <Activity mode={isLoading && variant === "spin" ? "visible" : "hidden"}>
        <Loader2 className="text-baraka-primary-300 absolute top-1/2 left-1/2 -translate-1/2 animate-spin" />
      </Activity>

      <Activity mode={isLoading && variant === "pulse" ? "visible" : "hidden"}>
        <div className="absolute aspect-square w-full animate-pulse bg-zinc-300" />
      </Activity>
    </div>
  );
};

export default ImageWithFallback;
