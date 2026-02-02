import { frontendURL } from "@/lib/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const CardRegisterForm = dynamic(
  () => import("@/features/auth/register/_components/CardRegisterForm"),
);

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Please enter your data below to create an account. Let's get started!",
  openGraph: {
    title: "Sign Up",
    description:
      "Please enter your data below to create an account. Let's get started!",
    locale: "id_ID",
    siteName: "Baraka Hijab",
    type: "website",
    url: frontendURL + "/auth/register",
  },
  alternates: {
    canonical: frontendURL + "/auth/register",
  },
  twitter: {
    card: "summary_large_image",
    images: [frontendURL + "/images/bg/bg-register.jpg"],
    site: "@BarakaHijab",
    title: "Sign Up",
    description:
      "Please enter your data below to create an account. Let's get started!",
  },
  keywords: [
    "Baraka Hijab",
    "Baraka Hijab Indonesia",
    "Baraka Hijab Online",
    "Baraka Hijab Sign Up",
    "Hijab",
    "Hijab Online",
  ],
};

export default function RegisterPage() {
  return (
    <main className="flex h-dvh items-center justify-center bg-[url(/images/bg/bg-register.jpg)] bg-cover bg-center lg:justify-between lg:bg-none">
      <CardRegisterForm />
      <div className="hidden h-dvh w-1/2 bg-[url(/images/bg/bg-register.jpg)] bg-cover bg-center lg:block" />
    </main>
  );
}
