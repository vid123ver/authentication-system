import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { authorize , authorizeSelfOrAdmin } from "../middleware/role.middleware";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controller";

import { createUserSchema , updateUserSchema } from "../validators/user.validator";

const router = Router();

// Get All Users
router.get(
    "/",
    authenticate,
    authorize("Admin"),
    getUsers
);

// Get User By ID
router.get(
    "/:id",
    authenticate,
    authorize("Admin"),
    getUserById
);

// Create User
router.post(
    "/",
    authenticate,
    authorize("Admin"),
    validate(createUserSchema),
    createUser
);

// Update User
router.put(
    "/:id",
    authenticate,
    authorizeSelfOrAdmin(),
    validate(updateUserSchema),
    updateUser
);

// Delete User
router.delete(
    "/:id",
    authenticate,
    authorize("Admin"),
    deleteUser
);


export default router;