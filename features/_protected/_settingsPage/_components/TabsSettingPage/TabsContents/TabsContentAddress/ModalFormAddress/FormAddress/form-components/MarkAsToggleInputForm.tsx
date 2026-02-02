import MyToolTip from "@/components/common/MyToolTip";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AddressSchemaPayloadType } from "@/entities/address/types/AddressSchema";
import { cn } from "@/lib/utils";
import { Building2Icon, HomeIcon, StoreIcon } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";

type MarkAsToggleInputFormProps = {
  form: UseFormReturn<AddressSchemaPayloadType>;
  errorMessage?: string;
};

/**
 * A form component to mark an address as home, office, or store.
 *
 * @param {UseFormReturn<AddressSchemaPayloadType>} form - The form object from react-hook-form.
 * @param {string} [errorMessage] - The error message to display if there is an error.
 * @returns {JSX.Element} - The JSX element representing the form component.
 */
export default function MarkAsToggleInputForm({
  form,
  errorMessage,
}: MarkAsToggleInputFormProps) {
  return (
    <section className="relative space-y-2">
      <Label className={cn("", errorMessage && "text-red-500")}>Mark As</Label>

      <Controller
        control={form.control}
        name="mark_as"
        render={({ field }) => (
          <ToggleGroup
            type="single"
            value={field.value}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            spacing={4}
            variant={"outline"}
          >
            <ToggleGroupItem
              value="home"
              className="data-[state=on]:bg-baraka-primary-300 data-[state=on]:text-white"
            >
              <HomeIcon />
              Home
            </ToggleGroupItem>
            <ToggleGroupItem
              value="office"
              className="data-[state=on]:bg-baraka-primary-300 data-[state=on]:text-white"
            >
              <Building2Icon />
              Office
            </ToggleGroupItem>
            <ToggleGroupItem
              value="store"
              className="data-[state=on]:bg-baraka-primary-300 data-[state=on]:text-white"
            >
              <StoreIcon />
              Store
            </ToggleGroupItem>
          </ToggleGroup>
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
    </section>
  );
}
