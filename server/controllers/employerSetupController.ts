import { Request, Response } from "express";
import Company from "../models/Company.js";
import EmployerProfile from "../models/EmployerProfile.js";
import User from "../models/User.js";
import { employerSetupSchema, companySetupSchema, employerProfileSetupSchema } from "../validators/index.js";
import { z } from "zod";

interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

// POST /api/employer/setup — Create company + profile in one request
export const setupEmployer = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        // Check if setup already completed
        const existingCompany = await Company.findOne({ user: userId });
        if (existingCompany) {
            res.status(400).json({ message: "Setup already completed. Use PUT to update." });
            return;
        }

        const validatedData = employerSetupSchema.parse(req.body);

        // Create company
        const company = new Company({
            user: userId,
            ...validatedData.company,
        });
        await company.save();

        // Create employer profile
        const profile = new EmployerProfile({
            user: userId,
            ...validatedData.profile,
        });
        await profile.save();

        // Mark profile as complete
        await User.findByIdAndUpdate(userId, { isProfileComplete: true });

        res.status(201).json({
            message: "Employer setup completed successfully",
            company,
            profile,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation failed", errors: error.issues });
        } else {
            console.error("Employer Setup Error:", error);
            res.status(500).json({ message: error.message || "Server Error" });
        }
    }
};

// GET /api/employer/profile — Get employer's company and profile
export const getEmployerProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        const company = await Company.findOne({ user: userId });
        const profile = await EmployerProfile.findOne({ user: userId });

        if (!company && !profile) {
            res.status(404).json({ message: "Employer profile not found. Please complete setup." });
            return;
        }

        res.json({ company, profile });
    } catch (error: any) {
        console.error("Get Employer Profile Error:", error);
        res.status(500).json({ message: error.message || "Server Error" });
    }
};

// PUT /api/employer/profile — Update company and/or profile
export const updateEmployerProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { company: companyData, profile: profileData } = req.body;

        let updatedCompany = null;
        let updatedProfile = null;

        if (companyData) {
            const validatedCompany = companySetupSchema.partial().parse(companyData);
            updatedCompany = await Company.findOneAndUpdate(
                { user: userId },
                { $set: validatedCompany },
                { new: true }
            );
            if (!updatedCompany) {
                res.status(404).json({ message: "Company not found. Please complete setup first." });
                return;
            }
        }

        if (profileData) {
            const validatedProfile = employerProfileSetupSchema.partial().parse(profileData);
            updatedProfile = await EmployerProfile.findOneAndUpdate(
                { user: userId },
                { $set: validatedProfile },
                { new: true }
            );
            if (!updatedProfile) {
                res.status(404).json({ message: "Profile not found. Please complete setup first." });
                return;
            }
        }

        res.json({
            message: "Profile updated successfully",
            company: updatedCompany,
            profile: updatedProfile,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation failed", errors: error.issues });
        } else {
            console.error("Update Employer Profile Error:", error);
            res.status(500).json({ message: error.message || "Server Error" });
        }
    }
};
