/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

type FooterLinksProps = {
  items: any[];
  showNavTitle?: boolean;
  title: string;
};

export default function FooterLinks({
  items,
  showNavTitle = true,
  title,
}: FooterLinksProps) {
  return (
    <section className="font-krub">
      <h4 className="font-bold">{title}</h4>
      <div
        className={cn(
          "flex flex-col",
          !showNavTitle &&
            "grid grid-cols-2 place-items-start justify-items-start gap-5",
        )}
      >
        {items.map((item, idx) => (
          <Fragment key={idx}>
            {showNavTitle && (
              <Link
                href={item.href ?? "#"}
                className="hover:text-baraka-primary-300"
              >
                {item.title}
              </Link>
            )}
            {item.image && (
              <section className="my-2">
                <Image
                  src={item.image}
                  alt="logo"
                  width={50}
                  height={50}
                  className="h-auto w-16 object-cover"
                />
              </section>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
