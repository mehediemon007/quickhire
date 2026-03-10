import { Response } from "express";
import jwt from 'jsonwebtoken';

export const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
    const accessToken  = jwt.sign(
        { userId: user._id, role: user.role, name: user.fullname},
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

    res.cookie("refreshToken", refreshToken,{
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
    })

    // const cookieOptions = {
    //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax" as const,
    // }

    // res.status(statusCode).cookie("token", accessToken, cookieOptions).json({
    //     success: true,
    //     accessToken,
    //     user: {
    //         id: user._id,
    //         email: user.email,
    //         role: user.role,
    //         fullname: user.fullname
    //     }
    // })

    res.status(statusCode).json({
        success: true,
        accessToken,
    })
}