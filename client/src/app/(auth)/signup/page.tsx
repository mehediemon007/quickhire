"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Paper,
    Alert,
} from "@mui/material";

import { api } from "@/lib/api";
import { useAppDispatch } from "@/hooks/redux";
import { setAuth } from "@/lib/features/auth/authSlice";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupForm } from "@/schemas/authSchema";

export default function SignupPage() {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors },} = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            role: "candidate",
        },
    });

    const onSubmit = async (data: SignupForm) => {
        try {
            const response = await api.post("/auth/signup", {
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                role: data.role,
            });

            dispatch(setAuth(response.data));
            router.push("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
                        Create Account
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Join QuickHire and find your dream job or talent.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            required
                            fullWidth
                            label="Full Name"
                            {...register("fullname")}
                            error={!!errors.fullname}
                            helperText={errors.fullname?.message}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Email Address"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            {...register("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            margin="normal"
                            variant="outlined"
                        />

                        <FormControl component="fieldset" sx={{ mt: 2, mb: 1 }}>
                            <FormLabel component="legend">Join as</FormLabel>
                            <RadioGroup row defaultValue="employee">
                                <FormControlLabel
                                    value="employee"
                                    control={<Radio {...register("role")} />}
                                    label="Employee"
                                />
                                <FormControlLabel
                                    value="employer"
                                    control={<Radio {...register("role")} />}
                                    label="Employer"
                                />
                            </RadioGroup>
                            {errors.role && (
                                <Typography variant="caption" color="error">
                                    {errors.role.message}
                                </Typography>
                            )}
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
                        >
                            Sign Up
                        </Button>

                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Typography variant="body2">
                                Already have an account?{" "}
                                <Button color="primary" onClick={() => router.push("/login")} sx={{ fontWeight: "bold", textTransform: "none" }}>
                                    Login
                                </Button>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}
