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
    id: string
) => {

};

export const createUser = async () => {

};

export const updateUser = async () => {

};

export const deleteUser = async () => {

};