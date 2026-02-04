"use client";

import Link from "next/link";
import ButtonsNav from "./ButtonsNav";
import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";
import { navLinks } from "./utils/navUtils";
import { useGSAP } from "@gsap/react";
import useHideNavbar from "@/hooks/useHideNavbar";
import gsap from "gsap";
import { HIDDEN_ROUTES_SET } from "@/constants/hiddenRoutes";

export default function Navbar() {
  const pathname = usePathname();
  const { navbarHidden } = useHideNavbar();
  useGSAP(() => {
    animateNavbar(navbarHidden);
  }, [navbarHidden]);

  if (HIDDEN_ROUTES_SET.has(pathname)) return null;

  return (
    <nav className="fixed top-0 z-10 flex w-full items-center justify-between bg-white px-5 py-2 shadow-md shadow-black/30">
      <div className="hidden items-center justify-between gap-5 lg:flex">
        {navLinks.map((item, idx) => (
          <Link href={item.href} key={idx} className="hover:text-">
            {item.title}
          </Link>
        ))}
      </div>
      <div className="">
        <Link href={"/"} className="font-krona-one text-2xl">
          BARAKA HIJAB
        </Link>
      </div>

      {/* tablet and desktop */}
      <div className="hidden items-center gap-4 lg:flex">
        <ButtonsNav />
      </div>

      {/* mobile and tablet <768px */}
      <NavMenu />
    </nav>
  );
}

const animateNavbar = (reverse: boolean) => {
  if (reverse) {
    return gsap.to("nav", {
      yPercent: -100,
      ease: "power3.inOut",
      duration: 1,
    });
  } else {
    return gsap.to("nav", {
      yPercent: 0,
      ease: "power3.inOut",
      duration: 1,
    });
  }
};
