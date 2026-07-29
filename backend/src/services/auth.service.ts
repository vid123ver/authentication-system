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
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/appError";

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
        throw new AppError(
    "User with this email already exists.",
    409
);
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
        role: "User",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);

    await writeUsers(users);
    const { password, ...safeUser } = newUser;

    // Return response
    return {
        success: true,
        message: "User registered successfully",
        data: safeUser
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
        throw new AppError(
    "Invalid email or password.",
    401
);
    }
    if (!user.isActive) {
    throw new AppError(
        "Your account is inactive. Please contact the administrator.",
        403
    );
}
    // Compare password
    const isPasswordCorrect = await comparePassword(
        data.password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new AppError(
    "Invalid email or password.",
    401
);
    }

    // Generate Access Token
    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role
    });

    // Generate Refresh Token
    const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role
    });

    // Read existing refresh tokens
    const refreshTokens = await readRefreshTokens();

    // Save refresh token
   
refreshTokens.push({
    userId: user.id,
    token: refreshToken,
    createdAt: new Date().toISOString()
});
    // Write refresh tokens
    await writeRefreshTokens(refreshTokens);

    // Return response
    return {
        success: true,
        message: "Login successful.",
        accessToken,
        refreshToken
    };
    

};
/*     --------    <---refresh token--->    --------     */ 
export const refreshToken = async (
    data: {
        refreshToken: string;
    }
) => {

    

    const refreshTokens =
        await readRefreshTokens();

    

    const storedToken =
        refreshTokens.find(
            (token: any) =>
                token.token === data.refreshToken
        );

    

    if (!storedToken) {

        

        
        throw new AppError(
    "Invalid refresh token.",
    401
);

    }

    let decoded: {
    id: string;
    email: string;
    role: string;
};

try {
    decoded = jwt.verify(
        data.refreshToken,
        env.REFRESH_TOKEN_SECRET
    ) as {
        id: string;
        email: string;
        role: string;
    };
} catch {
    throw new AppError(
        "Invalid or expired refresh token.",
        401
    );
}

    const accessToken =
        generateAccessToken({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        });

    return {
        success: true,
        message: "New access token generated.",
        accessToken,
    };

};
/*     --------    <---profile--->    --------     */ 
export const profile = async (userId: string) => {

    const users = await readUsers();

    const user = users.find(
        (user: User) => user.id === userId
    );

    if (!user) {
        throw new AppError(
    "User not found.",
    404
);
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
/*     --------    <---change password--->    --------     */ 
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
        throw new AppError(
            "User not found.",
            404
        );
    }

    // Compare old password
    const isPasswordCorrect = await comparePassword(
        data.oldPassword,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new AppError(
            "Old password is incorrect.",
            401
        );
    }

    // Prevent reusing the old password
    if (data.oldPassword === data.newPassword) {
        throw new AppError(
            "New password must be different from the old password.",
            400
        );
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

// Revoke all refresh tokens for this user
const refreshTokens = await readRefreshTokens();

const updatedRefreshTokens = refreshTokens.filter(
    (token: any) => token.userId !== user.id
);

await writeRefreshTokens(updatedRefreshTokens);

// Return response
return {
    success: true,
    message: "Password changed successfully. Please log in again."
};

};

/*     --------    <---logout--->    --------     */ 
export const logout = async (
    data: {
        refreshToken: string;
    }
) => {

    const refreshTokens = await readRefreshTokens();

    // Check if refresh token exists
    const tokenExists = refreshTokens.some(
        (token: any) => token.token === data.refreshToken
    );

    if (!tokenExists) {
        throw new AppError(
            "Invalid refresh token.",
            401
        );
    }

    // Remove the refresh token
    const updatedTokens = refreshTokens.filter(
        (token: any) => token.token !== data.refreshToken
    );

    // Save updated refresh tokens
    await writeRefreshTokens(updatedTokens);

    return {
        success: true,
        message: "Logged out successfully."
    };

};