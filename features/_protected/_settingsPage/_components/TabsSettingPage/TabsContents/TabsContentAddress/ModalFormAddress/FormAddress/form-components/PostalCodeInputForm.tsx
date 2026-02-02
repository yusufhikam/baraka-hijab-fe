import MyToolTip from "@/components/common/MyToolTip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressSchemaPayloadType } from "@/entities/address/types/AddressSchema";
import { cn } from "@/lib/utils";
import { Controller, UseFormReturn } from "react-hook-form";

type PostalCodeInputFormProps = {
  form: UseFormReturn<AddressSchemaPayloadType>;
  errorMessage?: string;
};

export default function PostalCodeInputForm({
  form,
  errorMessage,
}: PostalCodeInputFormProps) {
  return (
    <div className="relative space-y-2">
      <Label className={cn("", errorMessage && "text-red-500")}>
        Postal Code
      </Label>
      <Controller
        name="postal_code"
        control={form.control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Postal Code"
            readOnly
            className={cn(
              "border-baraka-lightgreen-200 border",
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
          className="absolute top-[50%] right-2"
        />
      )}
    </div>
  );
}
