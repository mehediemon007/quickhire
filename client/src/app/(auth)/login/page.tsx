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
    FormControl,
    FormLabel,
} from "@mui/material";
import { User, Building2, CircleCheck } from "lucide-react";
import SocialAuthButtons from "../_components/SocialAuthButtons";
import PasswordField from "../_components/PasswordField";

import { login } from "@/actions/auth.actions";
import { Controller, useForm, useWatch } from "react-hook-form";
import { LoginForm, loginSchema } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const roles = [
    {
        value: 'employee',
        title: 'Employee',
        description: 'Log in as a candidate',
        icon: <User size={18}/>,
    },
    {
        value: 'organization',
        title: 'Organization',
        description: 'Log in as a company',
        icon: <Building2 size={18}/>,
    },
];

export default function LoginPage() {

    const router = useRouter();

    const [toaster, setToaster] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: "", severity: "success" });
    const [ isPending, startTransition ] = useTransition();

    const { register, formState: { errors }, handleSubmit, control} = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "employee"
        }
    })

    const selectedRole = useWatch({ control, name: "role" });

    const onSubmit = async (data: LoginForm) => {

        startTransition(async () => {
            const result = await login(data);

            if(result.success){
                setToaster({ open: true, message: result.message, severity: "success" as AlertColor });
                router.push("/dashboard");
            } else {
                setToaster({ open: true, message: result.message || "Login failed", severity: "error" as AlertColor });
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
                            <FormControl error={!!errors.role} sx={{mb: 2.5, width: '100%'}}>
                                <FormLabel component="label" sx={{mb: 1}}>Login as</FormLabel>
                                <Controller
                                    name="role"
                                    control={control}
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
                                                            <Box sx={{ position: 'absolute', top: 12, right: 12, color: 'primary.main' }}>
                                                                <CircleCheck size={20} />
                                                            </Box>
                                                        )}
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink:0, width: 40, height: 40, borderRadius: '8px', backgroundColor: 'rgba(25, 118, 210, 0.1)', color: 'primary.main' }}>
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

                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                disabled={isPending}
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                autoComplete="email"
                                sx={{ mb: 2.5 }}
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
                        <SocialAuthButtons role={selectedRole} />
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
