"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
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
    CircularProgress,
} from "@mui/material";

import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";

// import { login, initialLoginState } from "@/actions/auth.actions";
import { useAppDispatch } from "@/hooks/redux";
import { setAuth } from "@/lib/features/auth/authSlice";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    // const [formState, formAction, isPending] = useFormState(login, initialLoginState);

    // Handle successful login
    useEffect(() => {
        if (formState.status === 'success' && formState.data?.user && formState.data?.token) {
            dispatch(setAuth({
                user: { 
                    id: formState.data.user._id,
                    email: formState.data.user.email,
                    fullname: formState.data.user.fullname,
                    role: formState.data.user.role,
                },
                token: formState.data.token,
            }));
            router.push("/");
        }
    }, [formState.status, formState.data, dispatch, router]);

    return (
        <div className="flex justify-center items-center min-h-dvh py-10 lg:py-20">
            {/* <ThemeProvider theme={theme}>
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

                            {formState.status === 'error' && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    <Typography variant="body2" sx={{ fontWeight: '500', mb: 1 }}>
                                        {formState.message}
                                    </Typography>
                                    {formState.errors && Object.entries(formState.errors).length > 0 && (
                                        <Box component="ul" sx={{ mb: 0, pl: 2, m: 0 }}>
                                            {Object.entries(formState.errors).map(([field, messages]) => (
                                                <li key={field}>
                                                    <Typography variant="caption">
                                                        {messages[0]}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </Box>
                                    )}
                                </Alert>
                            )}

                            <form action={formAction}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    disabled={isPending}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!formState.errors?.email}
                                    helperText={formState.errors?.email?.[0]}
                                    autoComplete="email"
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    disabled={isPending}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!formState.errors?.password}
                                    helperText={formState.errors?.password?.[0]}
                                    autoComplete="current-password"
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
            </ThemeProvider> */}
        </div>
    );
}
