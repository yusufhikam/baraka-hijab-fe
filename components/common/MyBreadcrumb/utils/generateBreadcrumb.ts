type BreadcrumbType = {
  label: string;
  href: string;
  isCurrent: boolean;
};

export default function generateBreadcrumb(pathname: string): BreadcrumbType[] {
  const segments = pathname
    .replace(/^\/|\/$/g, "") // menghapus '/' di awal dan akhir
    .split("/")
    .filter(Boolean); //memastikan tidak ada string kosong

  // start dengan home
  const breadcrumbs: BreadcrumbType[] = [
    { label: "Home", href: "/", isCurrent: segments.length === 0 },
  ];

  //   untuk membuat tiap segment
  let accumulatedPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    accumulatedPath += `/${segment}`;

    // untuk mengubah segment seperti slug => product-name menjadi product [spasi] name
    const label = segment.replace(/-/g, " ").toUpperCase();

    // menandai apakah ini halaman saat ini
    const isCurrent = i === segments.length - 1;

    breadcrumbs.push({
      label,
      href: accumulatedPath,
      isCurrent,
    });
  }
  return breadcrumbs;
}
