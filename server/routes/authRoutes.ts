import express from "express";
import passport from "../config/passport.js";
import authController from "../controllers/authController.js";
import { handleSocialCallback } from "../controllers/handleSocialCallback.js";

const router = express.Router();

router.get("/google", (req, res, next) => {
    const state = req.query.state as string;
    const validRoles = ["employee", "organization"];

    // ✅ If role is provided, validate it. If not, it's a login attempt.
    if (state && !validRoles.includes(state)) {
        return res.status(400).json({ message: "Invalid role provided" });
    }

    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
        state, // ✅ passed through OAuth round trip
    })(req, res, next);
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
    }),
    handleSocialCallback
);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
