import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputAuthProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  errorMessage?: string;
  label: string;
  isPassword?: boolean;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
  state?: boolean;
}
const InputAuth = ({
  register,
  label,
  errorMessage,
  isPassword = false,
  setState,
  state,
  ...props
}: InputAuthProps) => {
  return (
    <div className="relative flex w-full flex-col gap-2 text-black">
      <label className="font-semibold" htmlFor={props.id}>
        {label}
      </label>

      <div className="relative w-full">
        <input
          {...register}
          {...props}
          className={cn(
            "w-full rounded-sm bg-white px-2 py-1 outline-2 focus:outline-black",
            errorMessage && "outline-red-500",
          )}
        />

        {isPassword && (
          <Button
            onClick={() => setState && setState(!state)}
            type="button"
            size={"icon-sm"}
            variant={"ghost"}
            className="hover:text-baraka-primary-300 absolute right-0 bottom-1/2 translate-y-1/2 cursor-pointer hover:bg-transparent"
          >
            {state ? <EyeOff /> : <Eye />}
          </Button>
        )}
      </div>

      {errorMessage && (
        <p className="absolute -bottom-5 text-xs text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputAuth;
