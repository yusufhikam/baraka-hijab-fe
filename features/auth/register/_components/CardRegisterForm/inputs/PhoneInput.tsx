import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

type PhoneInputProps = {
  register: UseFormRegisterReturn;
  errorMessage?: string;
};

const PhoneInput = ({ register, errorMessage }: PhoneInputProps) => {
  return (
    <div className="relative inline-flex w-full flex-col gap-2 text-black">
      <label className="font-semibold" htmlFor="phone_number">
        Phone
      </label>

      <div
        className={cn(
          "flex w-full items-center rounded-sm outline-2 has-focus:outline-black",
          errorMessage && "outline-red-500",
        )}
      >
        <p className="rounded-l-sm border-r-2 bg-zinc-100 px-2 py-1 font-semibold text-zinc-400">
          +62
        </p>
        <input
          {...register}
          type="number"
          name="phone_number"
          id="phone_number"
          placeholder="895131xxxx"
          className="w-full rounded-r-sm bg-white px-2 py-1"
        />{" "}
      </div>
      {errorMessage && (
        <p className="absolute -bottom-5 text-xs text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
