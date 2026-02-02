import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const baseApiURL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const storageBaseURL = process.env.NEXT_PUBLIC_BASE_STORAGE_URL;
export const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL;
export const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const moneyFormatter = (amount: number | undefined | null) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

export const phoneFormatter = (raw: number | string | undefined) => {
  if (!raw) return "";

  const local = raw.toString();

  const p1 = local.slice(0, 3);
  const p2 = local.slice(3, 7);
  const p3 = local.slice(7, 11);

  return [p1, p2, p3].filter(Boolean).join("-");
};
