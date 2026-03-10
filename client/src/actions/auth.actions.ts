'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignupForm, signupSchema } from '@/lib/validations/auth.schema';
import { FormState } from '@/types/auth.types';

async function setAccessTokenCookie(accessToken: string) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
    });
}

export async function signup(formData: SignupForm): Promise<FormState> {
    
    const validatedFields = signupSchema.safeParse(formData);

    if(!validatedFields.success){

        return {
            success: false,
            message: "",
            error: "Validation Failed",
            fieldErrors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { fullname, email, password, role } = validatedFields.data;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                fullname,
                email,
                password,
                role
            })
        })

        const result = await response.json();

        console.log(result)

        if(!response.ok){
            return {
                success: false,
                message: "",
                error: result.error || "Failed to create account.",
                fieldErrors: result.errorMessage || null
            }
        }

        return {
            success: true,
            message: result.message || "Account created successfully!"
        }


    } catch (error: unknown){

        return {
            success: false,
            message: "",
            error: error instanceof Error ? error.message : "Unexpected error occurred."
        }
    }

    
}

export async function login(formData: FormData){

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
            credentials: "include",
        });

        const result = await response.json();

        if(!response.ok){
            return {
                success: false,
                message: "",
                error: result.error || "Invalid credentials."
            }
        }

        await setAccessTokenCookie(result.accessToken);

    } catch( error: unknown){
        return {
            success: false,
            message: "",
            error: error instanceof Error ? error.message : "Unexpected error.",
        };
    }

    redirect('/')

}

export async function refreshAccessToken(): Promise<string | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        const result = await response.json();
        if (!response.ok) return null;

        await setAccessTokenCookie(result.accessToken);
        return result.accessToken;

    } catch {
        return null;
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    redirect("/login");
}