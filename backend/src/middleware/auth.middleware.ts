import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded;

        next();

    } catch {

        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};