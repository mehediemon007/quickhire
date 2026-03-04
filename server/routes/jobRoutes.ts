import express from "express";
import { getJobs, getJobById, createJob, deleteJob } from "../controllers/jobController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", authenticate, authorize(["employer"]), createJob);
router.delete("/:id", authenticate, authorize(["employer"]), deleteJob);

export default router;
