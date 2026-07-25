import { readUsers } from "../utils/file.utils";
import { User } from "../models/user.model";

export const getUsers = async () => {

    // Read all users
    const users = await readUsers();

    // Remove password field
    const safeUsers = users.map((user: User) => {

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;

    });

    return {

        success: true,

        data: safeUsers

    };

};


export const getUserById = async (
    userId: string
) => {

    const users = await readUsers();

    const user = users.find(
        (user: User) => user.id === userId
    );

    if (!user) {
        throw new Error("User not found.");
    }

    const { password, ...safeUser } = user;

    return {

        success: true,

        data: safeUser

    };

};

export const createUser = async () => {

};

export const updateUser = async () => {

};

export const deleteUser = async () => {

};