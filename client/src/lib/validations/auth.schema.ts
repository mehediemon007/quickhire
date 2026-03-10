import { z } from 'zod';

const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number');

export const signupSchema = z.object({
    fullname: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name must be less than 100 characters'),
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: z.string(),
    role: z.enum(['candidate', 'employer'], { message: 'Please select a valid role' })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type SignupForm = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string().min(1,"Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

export type LoginForm = z.infer<typeof loginSchema>