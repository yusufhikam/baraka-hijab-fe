import MyToolTip from "@/components/common/MyToolTip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressSchemaPayloadType } from "@/entities/address/types/AddressSchema";
import { cn } from "@/lib/utils";
import { Controller, UseFormReturn } from "react-hook-form";

type PhoneInputFormProps = {
  form: UseFormReturn<AddressSchemaPayloadType>;
  errorMessage?: string;
};

export default function PhoneInputForm({
  form,
  errorMessage,
}: PhoneInputFormProps) {
  return (
    <div className="relative inline-flex w-full flex-col gap-2">
      <Label
        htmlFor="phone_number"
        className={cn("", errorMessage && "text-red-500")}
      >
        Phone Number
      </Label>

      <div
        className={cn(
          "border-baraka-lightgreen-200 inline-flex items-center rounded-md border",
          errorMessage && "border-2 border-red-500",
        )}
      >
        <p className="rounded-l-md bg-zinc-100 px-2 py-1.5">+62</p>
        <Controller
          name="phone_number"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="phone_number"
              placeholder="Enter the phone number"
              className={cn(
                "focus-visible:ring-baraka-primary-300 rounded-md rounded-l-none border px-2 py-2 focus:border-0 focus-visible:ring-2",
              )}
            />
          )}
        />
      </div>

      {errorMessage && (
        <MyToolTip
          message={errorMessage}
          iconable
          size="sm"
          variant="error"
          className="absolute top-[55%] right-2"
        />
      )}
    </div>
  );
}
