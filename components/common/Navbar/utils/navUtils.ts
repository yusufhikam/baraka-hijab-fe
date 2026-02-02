import { LayoutDashboard, Settings2Icon, Wallet } from "lucide-react";

export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "New Arrivals",
    href: "/store?latest=new-arrival",
  },
  {
    title: "Best Sellers",
    href: "/store?latest=best-seller",
  },
];

export const profileLinks = [
  {
    title: "Dashboard",
    href: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Transactions",
    href: "/user/transactions",
    icon: Wallet,
  },
  {
    title: "Account Settings",
    href: "/user/settings",
    icon: Settings2Icon,
  },
];

export const paymentMethodLogoLinks = [
  {
    title: "BCA",
    image: "/images/logo/bca.png",
  },
  {
    title: "BRI",
    image: "/images/logo/bri.png",
  },
  {
    title: "DANA",
    image: "/images/logo/dana.webp",
  },
  {
    title: "SHOPEEPAY",
    image: "/images/logo/shopee.webp",
  },
];

export const companyLinks = [
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
  },
];
