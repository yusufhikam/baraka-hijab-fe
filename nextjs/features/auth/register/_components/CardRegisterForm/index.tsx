import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

const CardLoginForm = () => {
  return (
    <Card className="flex w-4/5 flex-col justify-between bg-white/70 backdrop-blur-sm sm:w-2/3 lg:h-dvh lg:w-1/2 lg:rounded-none lg:bg-white lg:backdrop-blur-none">
      <CardHeader className="flex flex-col items-center justify-between gap-y-3">
        <Link
          href={"/"}
          prefetch
          className="font-krona-one origin-center text-center text-2xl transition-all duration-300 hover:scale-110 hover:font-bold sm:text-3xl"
        >
          BARAKA HIJAB
        </Link>

        <hr className="border-b-2 border-b-black" />
        <div className="text-center">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your data below to create an account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="">
        {/* REGISTER FORM */}
        <RegisterForm />
      </CardContent>

      <CardFooter className="">
        <p className="m-auto lg:ms-auto">
          Have an account?
          <span>
            <Link
              href={"/auth/login"}
              className="text-baraka-primary-300 hover:text-baraka-lightgreen-200"
            >
              {" "}
              Sign In
            </Link>
          </span>{" "}
          now
        </p>
      </CardFooter>
    </Card>
  );
};

export default CardLoginForm;
