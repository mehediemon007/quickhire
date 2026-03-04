import { Request, Response } from "express";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import { jobSchema } from "../validators/index.js";
import { z } from "zod";

interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const getJobs = async (req: Request, res: Response) => {
    try {
        const { category, location, search, featured } = req.query;
        const filter: any = {};

        if (category) filter.category = category;
        if (location) filter.location = { $regex: location as string, $options: "i" };
        if (featured === "true") filter.featured = true;

        if (search) {
            filter.$or = [
                { title: { $regex: search as string, $options: "i" } },
            ];
        }

        const jobs = await Job.find(filter)
            .populate("company", "companyName logo companyIndustry")
            .populate("postedBy", "fullname email")
            .sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error("GET Jobs Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("company", "companyName logo location companyIndustry companyLink companyDescription")
            .populate("postedBy", "fullname email");
        if (!job) {
            res.status(404).json({ error: "Job not found" });
            return;
        }
        res.json(job);
    } catch (error) {
        console.error("GET Job By ID Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        // Find the employer's company
        const company = await Company.findOne({ user: userId });
        if (!company) {
            res.status(400).json({ error: "Please complete your company setup first." });
            return;
        }

        const validatedData = jobSchema.parse(req.body);
        const newJob = new Job({
            ...validatedData,
            company: company._id,
            postedBy: userId,
        });
        await newJob.save();

        const populated = await newJob.populate("company", "companyName logo companyIndustry");
        res.status(201).json(populated);
    } catch (error) {
        console.error("CREATE Job Error:", error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
        } else {
            res.status(500).json({ error: "Server Error" });
        }
    }
};

// Get jobs posted by the authenticated employer
export const getMyJobs = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const jobs = await Job.find({ postedBy: userId })
            .populate("company", "companyName logo companyIndustry")
            .sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error("GET My Jobs Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404).json({ error: "Job not found" });
            return;
        }

        // Only the employer who posted the job can delete it
        if (job.postedBy.toString() !== userId) {
            res.status(403).json({ error: "You can only delete your own job postings." });
            return;
        }

        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
