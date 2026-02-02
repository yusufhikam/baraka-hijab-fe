"use client";

import { usePathname } from "next/navigation";
import {
  companyLinks,
  navLinks,
  paymentMethodLogoLinks,
} from "../Navbar/utils/navUtils";
import FooterLinks from "./FooterLinks";
import { HIDDEN_ROUTES_SET } from "@/constants/hiddenRoutes";

export default function Footer() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES_SET.has(pathname)) return null;
  return (
    <footer className="relative z-2 h-dvh w-full bg-zinc-950 pt-20 text-white">
      <section className="flex items-start justify-between px-10">
        <FooterLinks title="SHOP" items={navLinks} />
        <FooterLinks title="COMPANY" items={companyLinks} />
        <FooterLinks
          title="PAYMENT METHODS"
          items={paymentMethodLogoLinks}
          showNavTitle={false}
        />
      </section>

      {/* <h2 className="font-krona-one mt-20 w-full text-[10rem]/[8rem] font-black">
        BARAKA
        <br />
        <span className="float-end">HIJAB</span>
      </h2> */}
    </footer>
  );
}
