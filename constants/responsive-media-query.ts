const RESPONSIVE_KEYS = [
  "isMobile",
  "isTablet",
  "isLaptop",
  "isDesktop",
] as const;

export type RESPONSIVE_KEYS_TYPE = (typeof RESPONSIVE_KEYS)[number];

export const RESPONSIVE_MEDIA_QUERIES_CONTEXT: Record<
  RESPONSIVE_KEYS_TYPE,
  string
> = {
  isMobile: "(max-width: 640px)",
  isTablet: "(min-width: 640px) and (max-width: 1024px)",
  isLaptop: "(min-width: 1024px) and (max-width: 1280px)",
  isDesktop: "(min-width: 1280px)",
};

export type RESPONSIVE_MEDIA_QUERY_CONTEXT_TYPE = Record<
  RESPONSIVE_KEYS_TYPE,
  boolean
>;
