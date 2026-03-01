import type { Request, Response } from "express";
import Application from "../models/Application.js";
import { applicationSchema } from "../validators/index.js";
import { z } from "zod";

export const applyForJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = applicationSchema.parse(req.body);
        const newApplication = new Application(validatedData);
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
