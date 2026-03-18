"use client";

import React, { useTransition, useState } from "react";
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
    CircularProgress,
    Link as MuiLink,
    Alert,
    AlertColor,
    Snackbar
} from "@mui/material";

import { User, Building2, CircleCheck } from "lucide-react";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupForm, signupSchema } from "@/lib/validations/auth.schema";

import { signup } from "@/actions/auth.actions";
import SocialAuthButtons from "../_components/SocialAuthButtons";
import PasswordField from "../_components/PasswordField";

const roles = [
    {
        value: 'employee',
        title: 'Employee',
        description: 'Looking for job opportunities',
        icon: <User size={18}/>,
    },
    {
        value: 'organization',
        title: 'Organization',
        description: 'Hiring talented professionals',
        icon: <Building2 size={18}/>,
    },
];

export default function SignupPage() {
    const router = useRouter();

    const [toaster, setToaster] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: "", severity: "success" });
    const [ isPending, startTransition] = useTransition();
    
    const { register, handleSubmit, formState: { errors }, control} = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullname: "",
            organizationName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "employee"
        }
    })

    const onsubmit = async(data: SignupForm) => {

        startTransition(async () => {

            const result = await signup(data);

            if(result.success){
                setToaster({ open: true, message: result.message, severity: "success" as AlertColor });
                router.push("/dashboard")
            } else {
                setToaster({ open: true, message: result.message || result.error || "Signup failed", severity: "error" as AlertColor });
                console.error("Signup failed:", result.error)
            }
        })
    }

    const selectedRole = useWatch({ control, name: "role" })
    
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
                            Join and find your dream job or talent.
                        </Typography>

                        <form onSubmit={handleSubmit(onsubmit)}>

                            <FormControl error={!!errors.role} sx={{mb: 2.5}}>
                                <FormLabel component="label" sx={{mb: 1}}>Join as</FormLabel>

                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue="employee"
                                    render={({ field }) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>

                                            {roles.map((role) => {
                                                const isSelected = field.value === role.value;

                                                return (
                                                    <Box
                                                        key={role.value}
                                                        onClick={() => !isPending && field.onChange(role.value)}
                                                        sx={{
                                                            position: 'relative',
                                                            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 6px)' },
                                                            display: 'flex',
                                                            alignItems: 'start',
                                                            gap: 1.5,
                                                            px: 2,
                                                            py:1.5,
                                                            cursor: isPending ? 'not-allowed' : 'pointer',
                                                            borderRadius: '16px',
                                                            border: '1px solid #dadce0',
                                                            transition: 'all 0.2s ease',
                                                            borderColor: isSelected ? 'primary.main' : '#dadce0',
                                                            backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                                            },
                                                        }}
                                                    >
                                                        {isSelected && (
                                                            <Box
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: 12,
                                                                    right: 12,
                                                                    color: 'primary.main',
                                                                }}
                                                            >
                                                                <CircleCheck size={20} />
                                                            </Box>
                                                        )}

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink:0,
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: '8px',
                                                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                                                color: 'primary.main',
                                                            }}
                                                        >
                                                            {role.icon}
                                                        </Box>

                                                        <Box>
                                                            <Typography variant="subtitle1" color="#202430" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: '14px' }}>
                                                                {role.title}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'inline-block', lineHeight: 1.5, mt: 0.25 }}>
                                                                {role.description}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    )}
                                />
                                
                                {errors?.role && (
                                    <Typography variant="caption" color="error">
                                        {errors.role.message}
                                    </Typography>
                                )}
                            </FormControl>

                            {selectedRole === "organization" && (
                                <TextField
                                    fullWidth
                                    label="Organization Name"
                                    disabled={isPending}
                                    error={!!errors?.organizationName}
                                    helperText={errors?.organizationName?.message}
                                    variant="outlined"
                                    autoComplete="organization"
                                    sx={{ mb: 2.5 }}
                                    {...register("organizationName")}
                                />
                            )}

                            <TextField
                                fullWidth
                                label={selectedRole === "organization" ? "Your Full Name" : "Full Name"}
                                disabled={isPending}
                                error={!!errors?.fullname}
                                helperText={errors?.fullname?.message}
                                variant="outlined"
                                autoComplete="name"
                                sx={{ mb: 2.5 }}
                                {...register("fullname")}
                            />

                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                disabled={isPending}
                                error={!!errors?.email}
                                helperText={errors.email?.message}
                                variant="outlined"
                                autoComplete="email"
                                {...register("email")}
                            />

                            <PasswordField 
                                name="password"
                                register={register}
                                error={errors?.password}
                                disabled={isPending}
                                autoComplete="new-password"
                            />

                            <PasswordField 
                                name="confirmPassword"
                                label="Confirm Password"
                                register={register}
                                error={errors.confirmPassword}
                                disabled={isPending}
                                autoComplete="new-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isPending}
                                sx={{ height: 48, fontWeight: "bold" }}
                            >
                                {isPending ? <CircularProgress size={24} /> : "Sign Up"}
                            </Button>
                        </form>
                        <SocialAuthButtons role={selectedRole}/>
                        <Box sx={{ textAlign: "center", mt: 2.5}}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{" "}
                                <MuiLink 
                                    component={Link}
                                    href={'/login'} 
                                    color="primary"
                                    underline="hover" 
                                    sx={{ fontWeight: "bold"}}>
                                    Login
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
