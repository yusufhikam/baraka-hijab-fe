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
    <footer className="relative z-2 flex w-full flex-col justify-between gap-20 bg-zinc-950 pt-20 text-white sm:min-h-dvh">
      <section className="mb-40 flex flex-wrap items-start justify-between gap-5 px-10 text-lg">
        <FooterLinks title="SHOP" items={navLinks} />
        <FooterLinks title="COMPANY" items={companyLinks} />
        <FooterLinks
          title="PAYMENT METHODS"
          items={paymentMethodLogoLinks}
          showNavTitle={false}
        />
      </section>

      <h2 className="font-krona-one xs:text-left xs:text-[5.8rem]/[5rem] absolute bottom-10 mt-20 w-full text-center text-[4.5rem] font-black text-zinc-700 sm:text-[8.5rem]/[6.2rem] md:text-[11.7rem]/[8rem] lg:text-[15rem]/[15rem]">
        BARAKA
        {/* <br /> */}
        {/* <span className="xs:float-end">HIJAB</span> */}
      </h2>

      <div className="text-center text-white">
        <p> All rights reserved &copy; 2023 Baraka Hijab</p>
      </div>
    </footer>
  );
}
