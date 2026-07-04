import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

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

  const token = request.cookies.get("auth_token")?.value;
  let isAuthenticated = false;

  if (token) {
    const payload = await verifyToken(token);
    if (payload) {
      isAuthenticated = true;
    }
  }

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
