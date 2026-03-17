import express from "express";
import { setupEmployer, getEmployerProfile, updateEmployerProfile } from "../controllers/employerSetupController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authenticated employer
router.use(authenticate, authorize(["organization"]));

router.post("/setup", setupEmployer);
router.get("/profile", getEmployerProfile);
router.put("/profile", updateEmployerProfile);

export default router;
