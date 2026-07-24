import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const result = await authService.register(req.body);

        res.status(201).json(result);

    } catch (error) {

        next(error);

    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const result = await authService.login(req.body);

        res.status(200).json(result);

    } catch (error) {

        next(error);

    }
};

export const profile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        const result = await authService.profile(req.user.id);

        res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};
export const changePassword = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
console.log("Controller Hit");
console.log(req.body);
        const result = await authService.changePassword(
            req.user.id,
            req.body
        );

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};