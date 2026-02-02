"use client";

import { useState } from "react";
import ButtonSignIn from "./ButtonSignIn";
import InputAuth from "@/features/auth/_commonComponents/InputAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginPayloadType, loginSchema } from "@/types/auth.type";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const { login, errorMessage, isLoading } = useAuth();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleOnSubmit = async (payload: LoginPayloadType) => {
    try {
      await login(payload).unwrap();

      toast.success("Login Success", {
        description: "You're be redirected to home page.",
        position: "top-right",
        duration: 1500,
        richColors: true,
        icon: <CheckCircle2 />,
        style: {
          gap: "1em",
        },
        onAutoClose: () => {
          if (redirectUrl) {
            router.replace(redirectUrl);
          } else {
            router.replace("/");
          }

          reset();
        },
      });
    } catch {
      toast.error(errorMessage, {
        description: "Please try again.",
        position: "top-right",
        richColors: true,
        icon: <CheckCircle2 />,
        style: {
          gap: "1em",
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="font-poppins m-auto flex flex-col items-center justify-between gap-y-5 lg:w-2/3"
    >
      {/* EMAIL INPUT */}

      <InputAuth
        register={register("email")}
        label="Email"
        type="email"
        id="email"
        name="email"
        placeholder="example@email.com"
        errorMessage={errors.email?.message}
      />

      {/* PASSWORD INPUT */}
      <InputAuth
        register={register("password")}
        label="Password"
        id="password"
        name="password"
        autoComplete="off"
        placeholder="Enter Your Password"
        type={showPassword ? "text" : "password"}
        isPassword
        errorMessage={errors.password?.message}
        state={showPassword}
        setState={() => setShowPassword(!showPassword)}
      />

      <ButtonSignIn isLoading={isLoading} />
    </form>
  );
};

export default LoginForm;
