import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, role, fullname } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            fullname,
        });

        await newUser.save();

        // Generate JWT
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1d" }
        );

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role,
                fullname: newUser.fullname,
                isProfileComplete: newUser.isProfileComplete,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user: any = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                fullname: user.fullname,
                isProfileComplete: user.isProfileComplete,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default { signup, login };
