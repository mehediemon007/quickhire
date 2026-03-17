"use client";

import React, { useEffect } from "react";
import { Snackbar, Alert, Box, CircularProgress } from "@mui/material";

export default function AuthSuccessPage() {
    useEffect(() => {
        // Send message to the opener (main window)
        if (window.opener) {
            window.opener.postMessage("auth_success", window.location.origin);
            
            // Close the popup after a short delay to ensure message delivery
            setTimeout(() => {
                window.close();
            }, 500);
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
            <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Logged in successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}
