"use client";

import { useEffect, useState } from "react";
import ButtonSignUp from "./ButtonSignUp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterPayloadType, registerSchema } from "@/types/auth.type";
import { cn } from "@/lib/utils";
import InputAuth from "@/features/auth/_commonComponents/InputAuth";
import useMutateAuth from "@/features/auth/hooks/useMutateAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PhoneInput from "./inputs/PhoneInput";
import { CheckCircle2, XCircleIcon } from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { mutateRegister, isLoadingRegister, isSuccessRegister } =
    useMutateAuth();

  // handle form submit to mutate register
  const handleOnSubmit = (payload: RegisterPayloadType) => {
    mutateRegister(payload, {
      onSuccess: () => {
        reset();
        toast.success("Your account has been created.", {
          description: " Please login to your account.",
          position: "top-center",
          duration: 1500,
          action: {
            label: "Login Now",
            onClick: () => {
              router.push("/auth/login");
            },
          },
          richColors: true,
          icon: <CheckCircle2 />,
          style: {
            gap: "1em",
          },
        });
      },
      onError: (error: Error) => {
        const err = error as Error;
        toast.error(err.message, {
          description: "Please try again.",
          position: "top-center",
          richColors: true,
          icon: <XCircleIcon />,
          style: {
            gap: "1em",
          },
        });
      },
    });
  };

  // if mutation is successful, reset the form
  useEffect(() => {
    if (isSuccessRegister) reset();
  }, [isSuccessRegister, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className={cn(
        "font-poppins m-auto flex flex-col items-center justify-between gap-y-5 text-sm lg:w-5/6",
      )}
    >
      {/* NAME INPUT */}

      <InputAuth
        register={register("name")}
        label="Full Name"
        type="text"
        id="name"
        name="name"
        placeholder="Enter Your Full Name"
        errorMessage={errors.name?.message}
      />
      {/* EMAIL INPUT */}

      <InputAuth
        register={register("email")}
        label="Email"
        type="text"
        id="email"
        name="email"
        placeholder="example@email.com"
        errorMessage={errors.email?.message}
      />
      {/* PHONE INPUT */}

      <PhoneInput
        register={register("phone_number")}
        errorMessage={errors.phone_number?.message}
      />

      <div className="flex w-full flex-col items-center justify-between gap-x-3 gap-y-5 sm:flex-row">
        {/* PASSWORD INPUT */}

        <InputAuth
          register={register("password")}
          isPassword={true}
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Enter Your Password"
          errorMessage={errors.password?.message}
          setState={setShowPassword}
          state={showPassword}
        />

        {/*CONFIRM PASSWORD INPUT */}
        <InputAuth
          register={register("confirm_password")}
          isPassword={true}
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          id="confirm_password"
          name="confirm_password"
          placeholder="Enter Confirm Password"
          errorMessage={errors.confirm_password?.message}
          setState={setShowConfirmPassword}
          state={showConfirmPassword}
        />
      </div>

      <ButtonSignUp isLoading={isLoadingRegister} />
    </form>
  );
};

export default RegisterForm;
