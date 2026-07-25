import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
    console.log("Password:", password);
    console.log("SALT_ROUNDS:", SALT_ROUNDS);
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};