import { Response, Request, RequestHandler } from "express";
import Company from "../models/Company.js";
import EmployerProfile from "../models/EmployerProfile.js";
import User from "../models/User.js";
import { employerSetupSchema, companySetupSchema, employerProfileSetupSchema } from "../validators/index.js";
import { z } from "zod";
import { AuthRequest } from "../middleware/authMiddleware.js";

// POST /api/organization/setup — Create company + profile in one request
export const setupEmployer: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

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
            message: "Organization setup completed successfully",
            company,
            profile,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation failed", errors: error.issues });
        } else {
            console.error("Organization Setup Error:", error);
            res.status(500).json({ message: error.message || "Server Error" });
        }
    }
};

// GET /api/organization/profile — Get employer's company and profile
export const getEmployerProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

        const company = await Company.findOne({ user: userId });
        const profile = await EmployerProfile.findOne({ user: userId });

        if (!company && !profile) {
            res.status(404).json({ message: "Organization profile not found. Please complete setup." });
            return;
        }

        res.json({ company, profile });
    } catch (error: any) {
        console.error("Get Organization Profile Error:", error);
        res.status(500).json({ message: error.message || "Server Error" });
    }
};

// PUT /api/organization/profile — Update company and/or profile
export const updateEmployerProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
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
            console.error("Update Organization Profile Error:", error);
            res.status(500).json({ message: error.message || "Server Error" });
        }
    }
};
