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
type UserParams = {
    id: string;
};
export const getUserById = async (
    req: Request<UserParams>,
    res: Response,
    next: NextFunction
) => {
    try {

        const result =
            await userService.getUserById(
                req.params.id
            );

        res.status(200).json(result);

    } catch (error) {

        next(error);

    }
};