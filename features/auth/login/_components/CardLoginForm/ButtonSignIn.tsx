import { Button } from "@/components/ui/button";
import { baseURL, cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type ButtonSignInProps = {
  isLoading: boolean;
};

const ButtonSignIn: React.FC<ButtonSignInProps> = ({ isLoading }) => {
  return (
    <div className="mt-5 inline-flex w-full flex-col items-center justify-between gap-y-3 lg:w-2/3">
      <Button
        type="submit"
        className={cn(
          "w-full cursor-pointer text-base",
          isLoading && "animate-pulse cursor-wait",
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Please Wait...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      <p className="text-zinc-400">- OR -</p>

      <a
        href={`${baseURL}/oauth/google/redirect`}
        className="bg-baraka-primary-200 hover:bg-baraka-primary-400 inline-flex w-full items-center justify-center gap-5 rounded-md py-1.5 text-base"
      >
        <Image
          src={"/images/logo/Google__G__logo.svg.png"}
          alt="google logo"
          width={25}
          height={25}
          className="rounded-full bg-white object-cover p-0.5"
        />
        Sign In With Google
      </a>
    </div>
  );
};

export default ButtonSignIn;
