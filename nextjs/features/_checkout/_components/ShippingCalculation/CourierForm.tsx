import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COURIER_LABELS, COURIER_OPTIONS } from "@/constants/couriers";
import { RajaOngkirCostCheckPayloadType } from "@/entities/rajaOngkir/types/RajaOngkirCostCheckSchema";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Control, Controller } from "react-hook-form";

type CourierFormProps = {
  onSubmit: () => void;
  isLoading?: boolean;
  control: Control<RajaOngkirCostCheckPayloadType>;
};

const CourierForm: React.FC<CourierFormProps> = ({
  onSubmit,
  isLoading,
  control,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="inline-flex w-full flex-col items-center gap-4"
    >
      <section className="w-full space-y-4">
        <Label>Courier</Label>
        <Controller
          control={control}
          name="courier"
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Courier" />
              </SelectTrigger>
              <SelectContent>
                {COURIER_OPTIONS.map((courier) => (
                  <SelectItem value={courier} key={courier}>
                    {COURIER_LABELS[courier]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </section>

      <Button
        disabled={isLoading}
        type="submit"
        className={cn(
          "mx-auto w-1/2",
          isLoading && "animate-pulse cursor-wait",
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Loading...
          </>
        ) : (
          "CHECK COURIER"
        )}
      </Button>
    </form>
  );
};

export default CourierForm;
