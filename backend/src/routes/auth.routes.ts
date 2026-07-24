import { Router } from "express";
import { register } from "../controllers/auth.controller";

const router = Router();

// Register
router.post("/register", register);

// Login
router.post("/login", (req, res) => {
    res.json({
        success: true,
        message: "Login API - Coming Soon"
    });
});

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
router.get("/profile", (req, res) => {
    res.json({
        success: true,
        message: "Profile API - Coming Soon"
    });
});

// Change Password
router.put("/change-password", (req, res) => {
    res.json({
        success: true,
        message: "Change Password API - Coming Soon"
    });
});

export default router;