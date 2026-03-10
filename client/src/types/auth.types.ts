export type FormState = {
    success: boolean;
    message: string,
    error?: string,
    fieldErrors?: Record<string, string[]>
} | null | undefined