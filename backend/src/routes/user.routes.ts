import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser
} from "../controllers/user.controller";

import { createUserSchema , updateUserSchema } from "../validators/user.validator";

const router = Router();

// Get All Users
router.get(
    "/",
    authenticate,
    getUsers
);

// Get User By ID
router.get(
    "/:id",
    authenticate,
    getUserById
);

// Create User
router.post(
    "/",
    authenticate,
    validate(createUserSchema),
    createUser
);

// Update User
router.put(
    "/:id",
    authenticate,
    validate(updateUserSchema),
    updateUser
);

// Delete User
router.delete(
    "/:id",
    authenticate,
    (req, res) => {
        res.json({
            success: true,
            message: "Delete User API - Coming Soon"
        });
    }
);


export default router;