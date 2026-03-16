export type FormState = {
    success: boolean;
    message: string,
    error?: string,
    fieldErrors?: Record<string, string[]>
}

export type SessionPayload = {
    userId: string;
    email: string;
    role: string;
    expiresAt: Date;
};