"use client";

import React, { useTransition, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Alert,
    AlertColor,
    CircularProgress,
    Link as MuiLink,
    Snackbar,
    InputAdornment,
    IconButton
} from "@mui/material";
import SocialAuthButtons from "../_components/SocialAuthButtons";
import PasswordField from "../_components/PasswordField";

import { Eye, EyeOff } from "lucide-react";


import { login } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";


export default function LoginPage() {

    const router = useRouter();

    const [toaster, setToaster] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: "", severity: "success" });
    const [ isPending, startTransition ] = useTransition();
    const [showPassword, setShowPassword] = useState(false);

    const { register, formState: { errors }, handleSubmit} = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginForm) => {

        startTransition(async () => {
            const result = await login(data);

            if(result.success){
                setToaster({ open: true, message: result.message, severity: "success" as AlertColor });

                router.push("/dashboard");
                
            } else {
                setToaster({ open: true, message: result.message, severity: "error" as AlertColor });
            }
        })
    }

    return (
        <div className="flex justify-center items-center min-h-dvh py-10 lg:py-12">
            <Container maxWidth="sm">
                <Box>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                            <Link href="/">
                                <Image src="/assets/images/logo.svg" alt="Quick Hire" width={152} height={36} priority />
                            </Link>
                        </Box>
                        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2.75 }}>
                            Log in your account.
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                disabled={isPending}
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                autoComplete="email"
                                {...register("email")}
                                
                            />

                            <PasswordField  
                                name="password"
                                register={register}
                                error={errors.password}
                                disabled={isPending}
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isPending}
                                sx={{ py: 1.5, fontWeight: "bold" }}
                            >
                                {isPending ? <CircularProgress size={24} /> : "Login"}
                            </Button>
                        </form>
                        <SocialAuthButtons />
                        <Box sx={{ textAlign: "center", mt: 2.5 }}>
                            <Typography variant="body2" color="text.secondary">
                                Don&apos;t have an account?{" "}
                                <MuiLink 
                                    href="/signup"
                                    component={Link}
                                    color="primary"
                                    underline="hover"
                                    sx={{ fontWeight: "bold"}}>
                                        Sign Up
                                </MuiLink>
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container>
            <Snackbar
                open={toaster.open}
                autoHideDuration={3000}
                onClose={() => setToaster(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={toaster.severity} variant="filled" onClose={() => setToaster(prev => ({ ...prev, open: false }))}>
                    {toaster.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
