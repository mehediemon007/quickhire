import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendTokenResponse } from "../utils/authUtils.js";

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["candidate", "employer"]),
    fullname: z.string().min(2),
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

const signup = catchAsync(async (req: Request, res: Response) => {

    const result = signupSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({ message: "Validation failed", errors: result.error.flatten().fieldErrors });
    }

    const validatedData = result.data;

    const existingUser = await User.exists({ email: validatedData.email});
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);
    const user = await User.create({
        ...validatedData,
        password: hashedPassword
    });

    sendTokenResponse(user, 201, res);

});

const login = catchAsync(async (req: Request, res: Response) => {

    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({email});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    sendTokenResponse(user, 200, res);

});

const refresh = catchAsync(async (req: Request, res: Response) => {

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No refresh token" });
    }


    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    const accessToken = jwt.sign(
        { userId: user._id, email: user.email, role: user.role, fullname: user.fullname },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );

    res.status(200).json({ success: true, accessToken });
});

const logout = (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}

export default { signup, login, refresh, logout };
