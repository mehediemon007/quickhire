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
    Snackbar
} from "@mui/material";

import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";

import { login } from "@/actions/auth.actions";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {

    const router = useRouter();

    const [toaster, setToaster] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: "", severity: "success" });
    const [ isPending, startTransition ] = useTransition();

    const { register, formState: { errors }, handleSubmit} = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginForm) => {

        startTransition(async () => {
            const result = await login(data);

            if(result.success){
                setToaster({ open: true, message: result.message, severity: "success" as AlertColor });
            } else {
                setToaster({ open: true, message: result.message, severity: "error" as AlertColor });
            }
        })
    }

    return (
        <div className="flex justify-center items-center min-h-dvh py-10 lg:py-20">
            <ThemeProvider theme={theme}>
                <Container maxWidth="sm">
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                        <Link href="/">
                            <Image src="/assets/images/logo.svg" alt="Quick Hire" width={152} height={36} priority />
                        </Link>
                    </Box>
                    <Box>
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: "bold"}}>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                                Login to your QuickHire account.
                            </Typography>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    disabled={isPending}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    autoComplete="email"
                                    {...register("email")}
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    disabled={isPending}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    autoComplete="current-password"
                                    {...register("password")}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isPending}
                                    sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
                                >
                                    {isPending ? <CircularProgress size={24} /> : "Login"}
                                </Button>

                                <Box sx={{ textAlign: "center", mt: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Don&apos;t have an account?{" "}
                                        <Button 
                                            color="primary" 
                                            onClick={() => router.push("/signup")} 
                                            disabled={isPending}
                                            sx={{ fontWeight: "bold", backgroundColor: "transparent", textTransform: "none", '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>
                                                Sign Up
                                        </Button>
                                    </Typography>
                                </Box>
                            </form>
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
            </ThemeProvider>
        </div>
    );
}
