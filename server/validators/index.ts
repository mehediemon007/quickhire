import { z } from "zod";

export const jobSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    location: z.string().min(1, "Location is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export const applicationSchema = z.object({
    job_id: z.string().min(1, "Job ID is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    resume_link: z.string().url("Resume link must be a valid URL"),
    cover_note: z.string().min(10, "Cover note must be at least 10 characters"),
});

export const companySetupSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    logo: z.string().optional().default(""),
    location: z.string().min(1, "Location is required"),
    area: z.string().optional().default(""),
    companyLink: z.string().optional().default(""),
    companyIndustry: z.string().min(1, "Company industry is required"),
    companyDescription: z.string().min(10, "Company description must be at least 10 characters"),
});

export const employerProfileSetupSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().optional().default(""),
    designation: z.string().optional().default(""),
    gender: z.enum(["male", "female", "other", ""]).optional().default(""),
});

export const employerSetupSchema = z.object({
    company: companySetupSchema,
    profile: employerProfileSetupSchema,
});
