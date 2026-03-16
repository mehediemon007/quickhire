import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];
const DEFAULT_REDIRECT = "/login";
const AFTER_LOGIN_REDIRECT = "/dashboard";

export async function proxy(request: NextRequest) {

    const { pathname } = request.nextUrl;
    const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if(isPublicRoute){
        return NextResponse.next();
    }

    let isExpired = false;

    if (accessToken) {
        try {
            const decoded = decodeJwt(accessToken);
            const exp = decoded.exp! * 1000;

            if (Date.now() >= exp) isExpired = true;

        } catch {
            isExpired = false;
        }
    }

    if ((isExpired || !accessToken) && refreshToken) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                    "Content-Type": "application/json",
                },
            });

        const result = await response.json();

        if (response.ok && result.accessToken) {

            const nextResponse = NextResponse.next();

            nextResponse.cookies.set("accessToken", result.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 15 * 60,
            });

            nextResponse.headers.set('x-access-token', result.accessToken);

            return nextResponse;
        }
        } catch (error) {
            console.error("Middleware refresh failed", error);
        }
    }

    if (!accessToken && !refreshToken && !isPublicRoute) {
        console.log(accessToken, refreshToken, isPublicRoute)
        return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};