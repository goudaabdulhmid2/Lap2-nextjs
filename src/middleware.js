import { NextResponse } from "next/server";
import { updateSession } from "@/lib/session";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ["/auth/login", "/auth/signup"];

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const sessionPayload = await updateSession();
  const isAuthenticated = !!sessionPayload;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
