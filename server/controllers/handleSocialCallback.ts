// controllers/socialAuthController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const handleSocialCallback = async (req: Request, res: Response) => {
    const user = req.user as any;

    if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    const accessToken = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role,
            fullname: user.fullname,
            isProfileComplete: user.isProfileComplete,
        },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );

    // Persist refreshToken in DB for validation on /auth/refresh
    await User.findByIdAndUpdate(user._id, { refreshToken });

    return res.redirect(
        `${process.env.FRONTEND_URL}/api/auth/callback` +
        `?accessToken=${accessToken}` +
        `&refreshToken=${refreshToken}`
    );
};
