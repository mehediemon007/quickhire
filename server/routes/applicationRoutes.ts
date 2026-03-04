import express from "express";
import { applyForJob, getApplicationsByJob } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", applyForJob);
router.get("/job/:jobId", getApplicationsByJob);

export default router;
