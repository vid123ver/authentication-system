import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: z.ZodSchema) => {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {

        try {

            schema.parse(req.body);

            next();

        } catch (error: any) {

            res.status(400).json({
                success: false,
                errors: error.errors
            });

        }

    };

};