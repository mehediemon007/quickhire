"use client";

import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordFieldProps = {
    name: "password" | "confirmPassword";
    register: any;
    error?: any;
    disabled?: boolean;
    label?: string;
    autoComplete?: string;
}

const PasswordField = ({ name, register, error, disabled, label = "Password", autoComplete = "current-password" }: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            fullWidth
            label={label}
            type={showPassword ? "text" : "password"}
            disabled={disabled}
            variant="outlined"
            error={!!error}
            helperText={error?.message}
            autoComplete={autoComplete}
            {...register(name)}
            
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} color="#7C8493" />
                                ) : (
                                    <Eye size={18} color="#7C8493" />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default PasswordField;
