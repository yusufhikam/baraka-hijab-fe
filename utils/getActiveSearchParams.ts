import { ReadonlyURLSearchParams } from "next/navigation";

export default function getActiveSearchParams(
  searchParams: ReadonlyURLSearchParams,
) {
  const activeParams: Record<string, string[]> = {};

  for (const [key, value] of searchParams.entries()) {
    if (!activeParams[key]) {
      activeParams[key] = [];
    }

    activeParams[key].push(value);
  }

  return activeParams;
}
