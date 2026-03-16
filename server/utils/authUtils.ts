import { Response } from "express";
import jwt from 'jsonwebtoken';

export const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
    const accessToken  = jwt.sign(
        { userId: user._id, role: user.role, fullname: user.fullname},
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

    res.status(statusCode).json({
        success: true,
        accessToken,
        refreshToken
    })
}