import { Request, Response } from "express";
import Job from "../models/Job.js";
import { jobSchema } from "../validators/index.js";
import { z } from "zod";

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
                { company: { $regex: search as string, $options: "i" } },
            ];
        }

        const jobs = await Job.find(filter).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error("GET Jobs Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await Job.findById(req.params.id);
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

export const createJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = jobSchema.parse(req.body);
        const newJob = new Job(validatedData);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error("CREATE Job Error:", error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
        } else {
            res.status(500).json({ error: "Server Error" });
        }
    }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            res.status(404).json({ error: "Job not found" });
            return;
        }
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
