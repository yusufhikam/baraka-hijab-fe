export const COURIER_OPTIONS = [
  "jnt",
  "jne",
  "tiki",
  "pos",
  "ninja",
  "sicepat",
] as const;

export type CourierType = (typeof COURIER_OPTIONS)[number];

export const COURIER_LABELS: Record<CourierType, string> = {
  jne: "JNE",
  jnt: "J&T Express",
  tiki: "TIKI",
  ninja: "Ninja Express",
  pos: "POS Indonesia",
  sicepat: "SiCepat",
};
