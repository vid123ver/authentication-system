import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const users = await userService.getUsers();

        res.json(users);

    } catch (error) {

        next(error);

    }

};