import { Router } from "express";

const router = Router();

// Get All Users
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Get All Users API - Coming Soon"
    });
});

// Get User By ID
router.get("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Get User By ID API - Coming Soon"
    });
});

// Create User
router.post("/", (req, res) => {
    res.json({
        success: true,
        message: "Create User API - Coming Soon"
    });
});

// Update User
router.put("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Update User API - Coming Soon"
    });
});

// Delete User
router.delete("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Delete User API - Coming Soon"
    });
});

export default router;