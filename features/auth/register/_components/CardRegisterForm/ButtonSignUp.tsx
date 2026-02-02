import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonProps = {
  isLoading?: boolean;
};
const ButtonSignIn = ({ isLoading }: ButtonProps) => {
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
            <Loader2 className="animate-spin" /> Please Wait...
          </>
        ) : (
          "Sign Up"
        )}
      </Button>
    </div>
  );
};

export default ButtonSignIn;
