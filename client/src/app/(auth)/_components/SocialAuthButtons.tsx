import React from 'react'
import { Button, Divider, Typography, Alert, Stack } from '@mui/material';

import { AppleIcon, GoogleIcon } from '@/components/common/Icons';

type Props = {
    role?: "employee" | "organization"
}


import { useRouter } from 'next/navigation';

function SocialAuthButtons({ role }: Props) {
    const router = useRouter();

    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            
            if (event.data === "auth_success") {
                router.push("/dashboard");
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [router]);

    const handleGoogleLogin = () => {
        const params = new URLSearchParams();
        if (role) {
            params.append("state", role);
        }

        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/google${params.toString() ? `?${params}` : ""}`;
        
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        window.open(url, "google_login", `width=${width},height=${height},left=${left},top=${top}`);
    };

    const handleAppleLogin = () => {
        const params = new URLSearchParams();
        if (role) {
            params.append("state", role);
        }
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/apple${params.toString() ? `?${params}` : ""}`;
        
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        window.open(url, "apple_login", `width=${width},height=${height},left=${left},top=${top}`);
    };
    
    const isDisabled = role === undefined ? false : !role;
    const isSignup = !!role;


    return (
        <>
            <Divider sx={{my: 2}}>
                <Typography variant='caption' color='text.secondary'>
                    OR
                </Typography>
            </Divider>

            {isSignup && isDisabled && (
                <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                    Please select a role above before continuing with Google or Apple.
                </Alert>
            )}

            <Stack spacing={2} direction="row">
                <Button
                    fullWidth
                    variant='outlined'
                    size='large'
                    onClick={handleGoogleLogin}
                    disabled={isDisabled}
                    sx={{ gap: '4px'}}
                >
                    <GoogleIcon/>
                    {isSignup ? "Sign up with Google" : "Continue with Google"}
                </Button>
                <Button
                    fullWidth
                    variant='contained'
                    size='large'
                    onClick={handleAppleLogin}
                    disabled={isDisabled}
                    sx={{ 
                        backgroundColor: "#202430",
                        gap: '4px',
                        '&:hover': { 
                            backgroundColor: '#202430', 
                            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px' } }}
                >
                    <AppleIcon/>
                    {isSignup ? "Sign up with Apple" : "Sign in with Apple"}
                </Button>
            </Stack>
        </>
    )
}

export default SocialAuthButtons;