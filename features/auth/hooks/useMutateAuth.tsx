import authApi from "@/features/auth/api/authApi";
import { RegisterPayloadType } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useMutateAuth() {
  const router = useRouter();

  // mutation for POST register

  const {
    mutate: mutateRegister,
    isPending: isLoadingRegister,
    isSuccess: isSuccessRegister,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: RegisterPayloadType) => authApi.register(payload),
    onSuccess: () => {
      toast.success("Login Success", {
        description: "You're be redirected to main page.",
        position: "top-right",
        duration: 1500,
        richColors: true,
        icon: <CheckCircle2 />,
        style: {
          gap: "1em",
        },
        onAutoClose: () => {
          router.replace("/");
        },
      });
    },
    onError: (error) => {
      const err = error as Error;
      toast.error(err.message, {
        description: "Please try again.",
        position: "top-right",
        richColors: true,
        icon: <CheckCircle2 />,
        style: {
          gap: "1em",
        },
      });
    },
  });

  return { mutateRegister, isLoadingRegister, isSuccessRegister };
}
