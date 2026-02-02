import { Button } from "@/components/ui/button";

const ButtonSignIn = () => {
  return (
    <div className="mt-5 inline-flex w-full flex-col items-center justify-between gap-y-3 lg:w-2/3">
      <Button type="submit" className="w-full cursor-pointer text-base">
        Sign Up
      </Button>
    </div>
  );
};

export default ButtonSignIn;
