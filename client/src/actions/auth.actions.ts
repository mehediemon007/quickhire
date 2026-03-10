'use server';

import { SignupForm, signupSchema } from '@/lib/validations/auth.schema';
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