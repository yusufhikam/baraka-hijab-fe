import { useEffect, useState } from "react";

export default function useDebounce(value: string | undefined, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(
    value,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      return setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
