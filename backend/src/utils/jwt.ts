import jwt from "jsonwebtoken";
import { env } from "../config/env";


export const generateAccessToken = (
    payload: object
): string => {
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = (
    payload: object
): string => {
    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};