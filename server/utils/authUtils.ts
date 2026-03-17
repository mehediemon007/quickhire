import { Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const sendTokenResponse = async (user: any, statusCode: number, res: Response) => {
    const accessToken  = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role,
            fullname: user.fullname,
            isProfileComplete: user.isProfileComplete,
        },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m"}
    )

    const refreshToken = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_REFRESH_SECRET!,
        {expiresIn: '7d'}
    )

    // Persist refreshToken in DB for validation on /auth/refresh
    await User.findByIdAndUpdate(user._id, { refreshToken });

    res.status(statusCode).json({
        success: true,
        accessToken,
        refreshToken
    })
}