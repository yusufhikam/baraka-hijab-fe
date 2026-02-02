"use client";

import { usePathname } from "next/navigation";

export default function ProductSidebarFilter() {
  const pathname = usePathname();

  // const isDetailPage = ;

  return (
    <aside className="absolute top-1/2 w-full bg-red-500">
      <h2>Sample</h2>
    </aside>
  );
}
