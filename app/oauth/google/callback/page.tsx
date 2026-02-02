"use client";

import Greetings from "@/components/common/Greetings";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbakPage() {
  const router = useRouter();

  const { isVerifying, verifyAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isVerifying) {
      verifyAuth();
    }

    if (!isAuthenticated) router.replace("/auth/login");

    if (!isVerifying && isAuthenticated) {
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    }
  }, [router, isVerifying, verifyAuth, isAuthenticated]);

  return (
    // <ProtectedRoutes allowedUsers="customer">
    <main className="flex h-dvh items-center justify-center">
      <section className="h-1/2 w-1/2 overflow-hidden rounded-md bg-zinc-100 p-5 shadow">
        <div className="inline-flex items-center gap-5 font-semibold">
          <Image
            src={"/images/logo/Google__G__logo.svg.png"}
            alt="google logo"
            width={30}
            height={30}
          />
          <div className="inline-flex">
            <Greetings />{" "}
            <span>
              <p>, Welcome Back !</p>
            </span>
          </div>
        </div>

        <div className="m-auto inline-flex h-full w-full flex-col items-center">
          <div className="m-auto w-full space-y-10 text-center">
            <div className="text-2xl">
              <h3>Please Wait</h3>
              <p>Your sign-in is being processed...</p>
            </div>
            <Loader2
              size={70}
              strokeWidth={1}
              className="text-baraka-primary-300/70 m-auto animate-spin"
            />
          </div>
        </div>
      </section>
    </main>
    // </ProtectedRoutes>
  );
}
