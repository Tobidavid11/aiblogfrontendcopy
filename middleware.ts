import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "@/config/auth.config";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("accessToken");

	// Protect routes that require authentication
	if (
		!token &&
		!request.nextUrl.pathname.startsWith(authConfig.routes.signIn)
	) {
		return NextResponse.redirect(
			new URL(authConfig.routes.signIn, request.url),
		);
	}

	// Redirect authenticated users away from auth pages
	if (token && request.nextUrl.pathname.startsWith(authConfig.routes.signIn)) {
		return NextResponse.redirect(new URL(authConfig.routes.home, request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
