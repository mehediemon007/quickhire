'use server';

import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/auth';
import { LoginForm, loginSchema, SignupForm, signupSchema } from '@/lib/validations/auth.schema';
import { FormState } from '@/types/auth.types';


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

        if(response.ok && result.success){

            await createSession(result)

            return {
                success: true,
                message: result.message || "Account created successfully!"
            }
        }

        return {
            success: false,
            message: "",
            error: result.error || "Failed to create account.",
            fieldErrors: result.errorMessage || null
        }

    } catch (error: unknown){

        return {
            success: false,
            message: "",
            error: error instanceof Error ? error.message : "Unexpected error occurred."
        }
    }

    
}

export async function login(formData: LoginForm): Promise<FormState>{

    
    const validatedFields = loginSchema.safeParse(formData);

    if(!validatedFields.success){

        return {
            success: false,
            message: "",
            error: "",
            fieldErrors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { email, password } = validatedFields.data;

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

        if(response.ok && result.success){

            await createSession(result)
            
            return {
                success: true,
                message: result.message || "Logged In Successful"
            }

        }

        return {
            success: false,
            message: result.message,
            error: result.error || "Invalid credentials."
        }


    } catch( error: unknown){
        return {
            success: false,
            message: "",
            error: error instanceof Error ? error.message : "Unexpected error.",
        };
    }

}

export async function logout() {
    
    await deleteSession();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    redirect("/login");
}