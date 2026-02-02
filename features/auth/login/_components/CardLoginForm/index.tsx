import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./LoginForm";

const CardLoginForm = () => {
  return (
    <Card className="flex flex-col justify-between bg-white/70 backdrop-blur-sm sm:w-1/2 lg:h-dvh lg:rounded-none lg:bg-white lg:backdrop-blur-none">
      <CardHeader className="flex flex-col items-center justify-between gap-y-5">
        <Link
          href={"/"}
          prefetch
          className="font-krona-one origin-center text-center text-2xl transition-all duration-300 hover:scale-110 hover:font-bold sm:text-3xl"
        >
          BARAKA HIJAB
        </Link>

        <hr className="border-b-2 border-b-black" />
        <div className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="">
        <LoginForm />
      </CardContent>

      <CardFooter className="">
        <p className="m-auto lg:ms-auto">
          Don&apos;t have an account?
          <span>
            <Link
              href={"/auth/register"}
              className="text-baraka-primary-300 hover:text-baraka-lightgreen-200"
            >
              {" "}
              Sign Up
            </Link>
          </span>{" "}
          now
        </p>
      </CardFooter>
    </Card>
  );
};

export default CardLoginForm;
