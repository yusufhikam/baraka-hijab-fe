import Footer from "@/components/common/Footer";
// import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}

      <Footer />
    </>
  );
}
