"use client";

import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function AuthSuccessPage() {
    useEffect(() => {
        // Send message to the opener (main window)
        if (window.opener) {
            window.opener.postMessage("auth_success", window.location.origin);
            
            // Close the popup after a short delay to ensure message delivery
            setTimeout(() => {
                window.close();
            }, 500);
        } else {
            // If opened directly or opener lost, redirect to dashboard
            window.location.href = "/dashboard";
        }
    }, []);

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            flexDirection: 'column',
            gap: 2
        }}>
            <CircularProgress />
            <Typography variant="body1" color="text.secondary">
                Authenticating...
            </Typography>
        </Box>
    );
}
