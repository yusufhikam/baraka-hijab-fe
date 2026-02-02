"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import animatePageOut from "@/utils/animations/animatePageOut";
import React from "react";

type TransitionLinkProps = Omit<React.ComponentProps<"button">, "onClick"> & {
  href: string;
  children: React.ReactNode;
};

const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  ...props
}) => {
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
  };
  return (
    <Button {...props} onClick={handleClick} variant={"link"}>
      {children}
    </Button>
  );
};

export default TransitionLink;
