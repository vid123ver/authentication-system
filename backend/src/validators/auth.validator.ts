import { z } from "zod";

export const registerSchema = z.object({
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
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password cannot exceed 20 characters"),


    isActive: z
        .boolean()
        .optional()
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required")
});

export const changePasswordSchema = z.object({
    oldPassword: z
        .string()
        .min(1, "Current password is required"),

    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters")
        .max(20, "New password cannot exceed 20 characters")
});

export const refreshTokenSchema = z.object({

    refreshToken: z
        .string()
        .min(1, "Refresh token is required")

});

export const logoutSchema = z.object({
    refreshToken: z
        .string()
        .min(1, "Refresh token is required")
});