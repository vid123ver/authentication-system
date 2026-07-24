import { Router } from "express";
import { register , login } from "../controllers/auth.controller";
import { profile } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Refresh Token
router.post("/refresh-token", (req, res) => {
    res.json({
        success: true,
        message: "Refresh Token API - Coming Soon"
    });
});

// Logout
router.post("/logout", (req, res) => {
    res.json({
        success: true,
        message: "Logout API - Coming Soon"
    });
});

// Profile
router.get("/profile", authenticate, profile);

// Change Password
router.put("/change-password", (req, res) => {
    res.json({
        success: true,
        message: "Change Password API - Coming Soon"
    });
});

export default router;