import { z } from "zod";

// ----------------------
// Common Fields
// ----------------------

const userFields = {
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters"),

    lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name cannot exceed 50 characters"),

    email: z
        .string()
        .trim()
        .email("Please enter a valid email address"),

    role: z.enum(["Admin", "User"]),
};

// ----------------------
// Create User Schema
// ----------------------

export const createUserSchema = z.object({
    ...userFields,

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters"),
});

// ----------------------
// Update User Schema
// ----------------------

export const updateUserSchema = z.object({
    ...userFields,
});

// ----------------------
// Types
// ----------------------

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;