import express from "express";
import { getJobs, getJobById, createJob, deleteJob, getMyJobs } from "../controllers/jobController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// Employer-only routes
router.post("/", authenticate, authorize(["employer"]), createJob);
router.get("/my/posted", authenticate, authorize(["employer"]), getMyJobs);
router.delete("/:id", authenticate, authorize(["employer"]), deleteJob);

export default router;
