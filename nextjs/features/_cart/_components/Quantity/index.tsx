import ButtonQuantity from "./ButtonQuantity";
import { cn } from "@/lib/utils";

interface QuantityProps {
  value: number;
  onChange: (newValue: number) => void;
  isLoading?: boolean;
}

export default function Quantity({
  onChange,
  value,
  isLoading,
}: QuantityProps) {
  const handleMinQty = () => {
    onChange(Math.max(1, value - 1));
  };

  const handleMaxQty = () => {
    // max quantity: 99
    if (value > 99) return;
    onChange(value + 1);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = Math.min(99, Math.max(1, Number(e.target.value)));
    if (newValue >= 1) {
      onChange(newValue);
    }
  };

  return (
    <section className="flex items-center justify-between">
      {/* min quantity */}
      <ButtonQuantity
        icon="Minus"
        onClick={handleMinQty}
        className={cn(
          "border border-black/30 bg-zinc-800 text-white hover:bg-black hover:text-white active:scale-90",
          value === 1 && "pointer-events-none opacity-50",
          isLoading && "animate-pulse cursor-wait",
        )}
      />
      <input
        type="number"
        onChange={handleOnChange}
        disabled={isLoading}
        value={value}
        className="mx-2 h-8 w-10 max-w-20 rounded border border-black/30 bg-zinc-200 text-center font-semibold"
      />
      {/* <Button onClick={handleMaxQty}>Plus</Button> */}
      <ButtonQuantity
        icon="Plus"
        className={cn(
          "border border-black/30 bg-zinc-800 text-white hover:bg-black hover:text-white active:scale-90",
          isLoading && "animate-pulse cursor-wait",
        )}
        onClick={handleMaxQty}
      />
    </section>
  );
}
