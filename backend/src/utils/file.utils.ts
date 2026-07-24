import { promises as fs } from "fs";
import path from "path";

const usersFilePath = path.join(
    __dirname,
    "../data/users.json"
);

const refreshTokensFilePath = path.join(
    __dirname,
    "../data/refreshTokens.json"
);

// ----------------> USERS

export const readUsers = async () => {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
};

export const writeUsers = async (users: unknown) => {
    await fs.writeFile(
        usersFilePath,
        JSON.stringify(users, null, 2)
    );
};

// ------------> REFRESH TOKENS 

export const readRefreshTokens = async () => {
    const data = await fs.readFile(
        refreshTokensFilePath,
        "utf-8"
    );

    return JSON.parse(data);
};

export const writeRefreshTokens = async (
    tokens: unknown
) => {
    await fs.writeFile(
        refreshTokensFilePath,
        JSON.stringify(tokens, null, 2)
    );
};