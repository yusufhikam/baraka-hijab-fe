import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AddressSchemaPayloadType } from "@/entities/address/types/AddressSchema";
import { Controller, UseFormReturn } from "react-hook-form";

type DetailTextAreaProps = {
  form: UseFormReturn<AddressSchemaPayloadType>;
};

/**
 * DetailAddressInput component is used to render a textarea for user to enter detail of their address.
 * It takes a form object as a prop and renders a textarea with the placeholder "Enter the detail of your address: block, apartment, etc."
 * The value of the textarea is controlled by the form object.
 * @param {DetailTextAreaProps} form - The form object that controls the textarea.
 * @returns {JSX.Element} - The rendered textarea element.
 */
export default function DetailAddressInput({ form }: DetailTextAreaProps) {
  return (
    <div className="space-y-4">
      <Label htmlFor="detail">Detail Address</Label>
      <Controller
        name="detail"
        control={form.control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder="Enter the detail of your address: block, apartments, etc."
            name="detail"
            id="detail"
            value={field.value ?? ""}
          />
        )}
      />
    </div>
  );
}
