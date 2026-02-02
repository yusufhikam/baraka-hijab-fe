// constants for hiding some components when in certain routes

export const HIDDEN_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/oauth/google/callback",
  "/checkout/success",
] as const;

export const HIDDEN_ROUTES_SET = new Set<string>(HIDDEN_ROUTES);
