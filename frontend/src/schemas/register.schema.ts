import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(2, "First name must be at least 2 characters"),

        lastName: z
            .string()
            .trim()
            .min(2, "Last name must be at least 2 characters"),

        email: z
            .string()
            .trim()
            .email("Please enter a valid email"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z
            .string()
            .min(8, "Confirm Password is required"),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    );

export type RegisterFormData = z.infer<typeof registerSchema>;