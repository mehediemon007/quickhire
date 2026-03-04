import express from "express";
import { applyForJob } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", applyForJob);

export default router;
