import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "@/config/auth.config";

// Define public routes that don't require authentication
const publicRoutes = [
  authConfig.routes.signIn,
  authConfig.routes.signUp,
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/otp-verification",
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const path = request.nextUrl.pathname;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    // Redirect authenticated users away from auth pages
    if (token) {
      return NextResponse.redirect(
        new URL(authConfig.routes.home, request.url)
      );
    }
    return NextResponse.next();
  }

  // Protect all other routes that require authentication
  if (!token) {
    return NextResponse.redirect(
      new URL(authConfig.routes.signIn, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
