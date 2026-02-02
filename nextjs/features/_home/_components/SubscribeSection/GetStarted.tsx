import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div
      data-animate="subs-section-get-started"
      className="font-krub relative z-3 mt-10 flex h-72 flex-col items-center justify-center gap-10 rounded-xs p-5 text-center text-black text-shadow-black/20 text-shadow-lg sm:absolute sm:top-1/3 sm:left-1/2 sm:mt-0 sm:h-auto sm:w-1/3 sm:-translate-x-1/2 sm:translate-y-2/3 sm:space-y-4 sm:bg-white sm:text-shadow-none"
    >
      <Image
        src={"/images/bg/bg-store-header.webp"}
        alt="bg"
        fill
        sizes="(max-width:768px) 100vw, 50vw"
        className="block mask-t-from-30% mask-t-to-100% object-top sm:hidden"
      />
      <div className="z-2 space-y-2 sm:space-y-0">
        <h3 className="text-lg font-semibold sm:text-base">
          Your Style Story Starts Here
        </h3>
        <p className="text-sm">
          Sign Up and step into a curated world made for you
        </p>
      </div>

      <Button
        asChild
        className="bg-baraka-primary-300 hover:bg-baraka-lightgreen-200 z-99 rounded-xs uppercase shadow-lg shadow-black/30 hover:cursor-pointer sm:shadow-none"
      >
        <Link href="/auth/register">Let&apos;s Get Started</Link>
        {/* Let&apos;s Get Started */}
      </Button>
    </div>
  );
};

export default GetStarted;
