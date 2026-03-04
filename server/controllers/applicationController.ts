import type { Request, Response } from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { applicationSchema } from "../validators/index.js";
import { z } from "zod";

interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

// POST — Employee applies for a job
export const applyForJob = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        const validatedData = applicationSchema.parse(req.body);

        // Find the job to get the company ref
        const job = await Job.findById(validatedData.job);
        if (!job) {
            res.status(404).json({ error: "Job not found" });
            return;
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            job: validatedData.job,
            applicant: userId,
        });
        if (existingApplication) {
            res.status(400).json({ error: "You have already applied for this job." });
            return;
        }

        const newApplication = new Application({
            ...validatedData,
            applicant: userId,
            company: job.company,
        });
        await newApplication.save();

        res.status(201).json(newApplication);
    } catch (error) {
        console.error("APPLY Job Error:", error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
        } else {
            res.status(500).json({ error: "Server Error" });
        }
    }
};

// GET — Employee views their own applications
export const getMyApplications = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const applications = await Application.find({ applicant: userId })
            .populate({
                path: "job",
                select: "title location category",
                populate: { path: "company", select: "companyName logo" },
            })
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        console.error("GET My Applications Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// GET — Employer views applications for a specific job they posted
export const getApplicationsByJob = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const jobId = req.params.jobId;

        // Verify the job belongs to this employer
        const job = await Job.findById(jobId);
        if (!job) {
            res.status(404).json({ error: "Job not found" });
            return;
        }
        if (job.postedBy.toString() !== userId) {
            res.status(403).json({ error: "Access denied. This is not your job posting." });
            return;
        }

        const applications = await Application.find({ job: jobId })
            .populate("applicant", "fullname email")
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        console.error("GET Applications By Job Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// PUT — Employer updates application status (reviewed, shortlisted, rejected)
export const updateApplicationStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "reviewed", "shortlisted", "rejected"].includes(status)) {
            res.status(400).json({ error: "Invalid status value" });
            return;
        }

        const application = await Application.findById(id).populate("job");
        if (!application) {
            res.status(404).json({ error: "Application not found" });
            return;
        }

        // Verify the job belongs to this employer
        const job = await Job.findById(application.job);
        if (!job || job.postedBy.toString() !== userId) {
            res.status(403).json({ error: "Access denied." });
            return;
        }

        application.status = status;
        await application.save();

        res.json({ message: "Application status updated", application });
    } catch (error) {
        console.error("UPDATE Application Status Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};
