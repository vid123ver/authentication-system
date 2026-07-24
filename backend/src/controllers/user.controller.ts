import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const result = await userService.getUsers();

        res.status(200).json(result);

    } catch (error) {

        next(error);

    }

};