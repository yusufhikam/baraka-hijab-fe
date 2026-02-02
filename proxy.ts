import { NextRequest, NextResponse } from "next/server";

const protectedRoute = ["/user", "/oauth"];
const authRoutes = ["/auth/login", "/auth/register"];

export default async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const googleCallbackCodeParams = searchParams.get("success");
  const token = request.cookies.get("refreshToken")?.value;
  const isLoggedIn = !!token;

  // to setup redirect url from last time user visited a page
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);

  //! auth routes
  if (authRoutes.some((route) => pathname.startsWith(route)) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //! protected route => need to login
  if (
    protectedRoute.some((route) => pathname.startsWith(route)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(loginUrl);
  }

  // check active checkout session
  const checkoutSession =
    request.cookies.get("checkout_active_session")?.value === "1";

  //! checkout page => need active checkout session
  if (pathname === "/checkout" && !checkoutSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //! success page => doesn't need active checkout session, but order_id
  const order_id = searchParams.get("order_id");

  if (pathname === "/checkout/success" && !order_id) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/auth/:path*",
    "/oauth/:path*",
    "/checkout/:path*",
  ],
};
