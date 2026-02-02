"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../../ui/breadcrumb";
import generateBreadcrumb from "./utils/generateBreadcrumb";
import Link from "next/link";

export default function MyBreadcrumb() {
  const pathname = usePathname();

  const breadcrumbs = generateBreadcrumb(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, idx) => (
          <BreadcrumbItem key={idx}>
            {item.isCurrent ? (
              // jika item adalah current page, tampilkan sebagai teks biasa
              <span className="font-semibold text-black">{item.label}</span>
            ) : (
              // jika item bukan current page, tampilkan sebagai link
              <BreadcrumbLink asChild className="uppercase">
                <Link href={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            )}

            {/* menampilkan separator '/' kecuali item terakhir */}
            {idx !== breadcrumbs.length - 1 && <span>/</span>}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
