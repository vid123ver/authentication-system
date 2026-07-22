import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = "access_secret";
const REFRESH_TOKEN_SECRET = "refresh_secret";

export const generateAccessToken = (
    payload: object
): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = (
    payload: object
): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};