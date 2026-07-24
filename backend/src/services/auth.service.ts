import { User } from "../models/user.model";
import { readUsers } from "../utils/file.utils";


export const register = async (
    data: Partial<User>
) => {
    
    const users = await readUsers();
//     console.log(users);
// console.log(Array.isArray(users));
    const existingUser = users.find(
        (user: User) => user.email === data.email
    );
    

    if (existingUser) {
        throw new Error("User with this email already exists.");
    }

    return {
        success: true,
        message: "User registered successfully",
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