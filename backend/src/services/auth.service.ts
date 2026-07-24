import { User } from "../models/user.model";
import { readUsers , writeUsers} from "../utils/file.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateId } from "../utils/helpers";
import { generateAccessToken } from "../utils/jwt";
import { generateRefreshToken } from "../utils/jwt";
import {
    readRefreshTokens,
    writeRefreshTokens
} from "../utils/file.utils";

export const register = async (
    data: Partial<User>
) => {

    // Read all users
    const users = await readUsers();

    // Check if email already exists
    const existingUser = users.find(
        (user: User) => user.email === data.email
    );

    if (existingUser) {
        throw new Error("User with this email already exists.");
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password!);

    // Create new user object
    const newUser: User = {
        id: generateId(),
        firstName: data.firstName!,
        lastName: data.lastName!,
        email: data.email!,
        password: hashedPassword,
        role: data.role ?? "User",
        isActive: data.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);

    await writeUsers(users);

    // Return response
    return {
        success: true,
        message: "User registered successfully",
        data: newUser
    };

};


/*     --------    <---LOGIN--->    --------     */ 

export const login = async (
    data: {
        email: string;
        password: string;
    }
) => {

    // Read all users
    const users = await readUsers();

    // Find user by email
    const user = users.find(
        (user: User) => user.email === data.email
    );

    if (!user) {
        throw new Error("Invalid email or password.");
    }
    const isPasswordCorrect = await comparePassword(
        data.password,
        user.password
    );

    // Check password
    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password.");
    }
    const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role
});
/*     --------    <---refresh token--->    --------     */ 
const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role
    });

    const refreshTokens = await readRefreshTokens();

    const newRefreshToken = {
        userId: user.id,
        token: refreshToken,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString()
    };

    refreshTokens.push(newRefreshToken);

    await writeRefreshTokens(refreshTokens);

    return {
        success: true,
        message: "Login successful.",
        accessToken,
        refreshToken
    };
    
};
/*     --------    <---profile--->    --------     */ 
export const profile = async (userId: string) => {

    const users = await readUsers();

    const user = users.find(
        (user: User) => user.id === userId
    );

    if (!user) {
        throw new Error("User not found.");
    }

    return {
        success: true,
        data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt
        }
    };

};
/*     --------    <---profile--->    --------     */ 
export const changePassword = async (
    userId: string,
    data: {
        oldPassword: string;
        newPassword: string;
    }
) => {

    // Read users
    const users = await readUsers();

    // Find logged-in user
    const user = users.find(
        (user: User) => user.id === userId
    );

    if (!user) {
        throw new Error("User not found.");
    }

    // Compare old password
    const isPasswordCorrect = await comparePassword(
        data.oldPassword,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Old password is incorrect.");
    }

    // Hash new password
    const hashedPassword = await hashPassword(
        data.newPassword
    );

    // Update password
    user.password = hashedPassword;
    user.updatedAt = new Date().toISOString();

    // Save users
    await writeUsers(users);

    // Return response
    return {
        success: true,
        message: "Password changed successfully."
    };

};