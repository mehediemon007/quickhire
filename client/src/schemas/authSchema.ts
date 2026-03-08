import { email, z } from 'zod';

export const signupSchema = z.object({
    fullname: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email("Invalid Email Address"),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.enum(['candidate', 'employer'])
})

export type SignupForm = z.infer<typeof signupSchema>;