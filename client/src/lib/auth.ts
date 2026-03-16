import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import type { SessionPayload } from "@/types/auth.types";

type AuthData = {
    success: string,
    accessToken: string,
    refreshToken: string
}

export async function createSession(authData : AuthData) {

    const { accessToken, refreshToken } = authData;
    
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
    });

    if(refreshToken){
        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });
    }
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) return null;

    try {
        const payload = decodeJwt(token);
        return payload as SessionPayload;
    } catch {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
}