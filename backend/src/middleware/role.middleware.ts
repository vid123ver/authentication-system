import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const authorize = (...roles: string[]) => {

    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): void => {

        if (!req.user) {

            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

            return;
        }

        if (!roles.includes(req.user.role)) {

            res.status(403).json({
                success: false,
                message: "only Admins are allowed to perform this action"
            });

            return;
        }

        next();

    };

};


export const authorizeSelfOrAdmin = () => {

    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): void => {

        if (!req.user) {

            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

            return;
        }

        const isAdmin = req.user.role === "Admin";
        const isOwner = req.user.id === req.params.id;

        if (!isAdmin && !isOwner) {

            res.status(403).json({
                success: false,
                message: "You are not authorized to perform this action."
            });

            return;
        }

        next();

    };

};