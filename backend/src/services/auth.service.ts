import { User } from "../models/user.model";
import { readUsers } from "../utils/file.utils";


export const register = async (
    data: Partial<User>
) => {
    const users = await readUsers();
    return {
        success: true,
        message: "Users fetched successfully",
        data: users
    };
};

export const login = async (
    data: {
        email: string;
        password: string;
    }
) => {

    // Find user

    // Compare password

    // Generate JWT

    // Generate Refresh Token

    // Save Refresh Token

    // Return Tokens

};