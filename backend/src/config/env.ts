import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || "5000",

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,

    ACCESS_TOKEN_EXPIRES_IN:
        process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",

    REFRESH_TOKEN_EXPIRES_IN:
        process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
};