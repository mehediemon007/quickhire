import express from "express";
import {
    applyForJob,
    getMyApplications,
    getApplicationsByJob,
    updateApplicationStatus,
} from "../controllers/applicationController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Employee routes
router.post("/", authenticate, authorize(["employee"]), applyForJob);
router.get("/my", authenticate, authorize(["employee"]), getMyApplications);

// Employer routes
router.get("/job/:jobId", authenticate, authorize(["employer"]), getApplicationsByJob);
router.put("/:id/status", authenticate, authorize(["employer"]), updateApplicationStatus);

export default router;
