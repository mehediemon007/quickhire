import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    if (!accessToken || !refreshToken) {
        return NextResponse.redirect(
            new URL("/login?error=missing_tokens", frontendUrl)
        );
    }

    const response = NextResponse.redirect(new URL("/auth-success", frontendUrl));

    response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60, // 15 minutes
    });

    response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
}
