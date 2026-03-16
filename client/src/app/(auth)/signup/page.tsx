"use client";

import React, { useActionState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
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
    CircularProgress,
} from "@mui/material";

import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupForm, signupSchema } from "@/lib/validations/auth.schema";

import { signup } from "@/actions/auth.actions";

export default function SignupPage() {
    const router = useRouter();

    const [ isPending, startTransition] = useTransition();
    
    const { register, handleSubmit, formState: { errors }, control} = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "candidate"
        }
    })

    const onsubmit = async(data: SignupForm) => {

        startTransition(async () => {

            const result = await signup(data);

            if(!result.success){
                console.log(result.error)
            }

            router.push("/dashboard")
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
                            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
                                Create Account
                            </Typography>
                            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                                Join QuickHire and find your dream job or talent.
                            </Typography>

                            {/* {formState.status === 'error' && (
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
                            )} */}

                            <form onSubmit={handleSubmit(onsubmit)}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    disabled={isPending}
                                    error={!!errors?.fullname}
                                    helperText={errors?.fullname?.message}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="name"
                                    {...register("fullname")}
                                />

                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    disabled={isPending}
                                    error={!!errors?.email}
                                    helperText={errors.email?.message}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="email"
                                    {...register("email")}
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    disabled={isPending}
                                    error={!!errors?.password}
                                    helperText={errors?.password?.message}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="new-password"
                                    {...register("password")}
                                />

                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    disabled={isPending}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="new-password"
                                    {...register("confirmPassword")}
                                />

                                <FormControl component="fieldset" sx={{ mt: 2, mb: 1 }} error={!!errors.role}>
                                    <FormLabel component="legend">Join as</FormLabel>

                                    <Controller
                                        name="role"
                                        control={control}
                                        defaultValue="candidate"
                                        render={({field}) => (
                                            <RadioGroup row {...field}>
                                                <FormControlLabel
                                                    value="candidate"
                                                    control={<Radio disabled={isPending} />}
                                                    label="Candidate"
                                                />
                                                <FormControlLabel
                                                    value="employer"
                                                    control={<Radio disabled={isPending} />}
                                                    label="Employer"
                                                />
                                            </RadioGroup>
                                        )}
                                
                                    />
                                    
                                    {errors?.role && (
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
                                    disabled={isPending}
                                    sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
                                >
                                    {isPending ? <CircularProgress size={24} /> : "Sign Up"}
                                </Button>

                                <Box sx={{ textAlign: "center", mt: 2 }}>
                                    <Typography variant="body2">
                                        Already have an account?{" "}
                                        <Button 
                                            color="primary" 
                                            onClick={() => router.push("/login")} 
                                            disabled={isPending}
                                            sx={{ fontWeight: "bold", backgroundColor: "transparent", textTransform: "none", '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>
                                            Login
                                        </Button>
                                    </Typography>
                                </Box>
                            </form>
                        </Paper>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
