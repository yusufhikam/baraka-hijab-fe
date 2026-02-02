import MyToolTip from "@/components/common/MyToolTip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressSchemaPayloadType } from "@/entities/address/types/AddressSchema";
import { cn } from "@/lib/utils";
import { Controller, UseFormReturn } from "react-hook-form";

type RecipientNameInputFormProps = {
  form: UseFormReturn<AddressSchemaPayloadType>;
  errorMessage?: string;
};

export default function RecipientNameInputForm({
  form,
  errorMessage,
}: RecipientNameInputFormProps) {
  return (
    <div className="relative inline-flex w-full flex-col gap-2">
      <Label
        htmlFor="recipient_name"
        className={cn("", errorMessage && "text-red-500")}
      >
        Recipient Name
      </Label>
      <Controller
        name="recipient_name"
        control={form.control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            id="recipient_name"
            placeholder="Enter the recipient name"
            className={cn(
              "focus-visible:ring-baraka-primary-300 border-baraka-lightgreen-200 rounded-md border px-2 py-2 focus:border-0 focus-visible:ring-2",
              errorMessage && "border-2 border-red-500",
            )}
          />
        )}
      />

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
