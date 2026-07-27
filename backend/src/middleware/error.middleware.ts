import {
    Request,
    Response,
    NextFunction
} from "express";

import { AppError } from "../utils/appError";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    console.error(err);

    const statusCode =
        err instanceof AppError
            ? err.statusCode
            : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

};