import { z } from "zod";

export const createUserSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["Admin", "User"])
});



export const updateUserSchema = z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    email: z.email().optional(),
    role: z.enum(["Admin", "User"]).optional(),
    isActive: z.boolean().optional()
});