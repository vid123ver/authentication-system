import { readUsers, writeUsers } from "../utils/file.utils";
import { User } from "../models/user.model";
import { v4 as uuid } from "uuid";
import { hashPassword } from "../utils/bcrypt";
import { AppError } from "../utils/appError";

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
       throw new AppError(
    "User not found.",
    404
);
    }

    const { password, ...safeUser } = user;

    return {

        success: true,

        data: safeUser

    };

};

export const createUser = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "Admin" | "User";
}) => {

    const users = await readUsers();

    const existingUser = users.find(
        (user: User) => user.email === data.email
    );

    if (existingUser) {
        throw new AppError(
    "User already exists.",
    409
);
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser: User = {
        id: uuid(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    await writeUsers(users);

    const { password, ...safeUser } = newUser;

    return {
        success: true,
        message: "User created successfully.",
        data: safeUser
    };

};

export const updateUser = async (
    id: string,
    data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        role?: "Admin" | "User";
        isActive?: boolean;
    },
    currentUser: {
        id: string;
        role: "Admin" | "User";
    }
) => {

    const users = await readUsers();

    const userIndex = users.findIndex(
        (user: User) => user.id === id
    );

    if (userIndex === -1) {
        throw new AppError(
        "User not found.",
        404
    );
    }

    // Check duplicate email
    if (data.email) {

        const existingUser = users.find(
            (user: User) =>
                user.email === data.email &&
                user.id !== id
        );

        if (existingUser) {
            throw new AppError(
    "Email already exists.",
    409
);
        }

    }
    users[userIndex].firstName =
    data.firstName ?? users[userIndex].firstName;

users[userIndex].lastName =
    data.lastName ?? users[userIndex].lastName;

users[userIndex].email =
    data.email ?? users[userIndex].email;

if (currentUser.role === "Admin") {

    users[userIndex].role =
        data.role ?? users[userIndex].role;

    users[userIndex].isActive =
        data.isActive ?? users[userIndex].isActive;

}

users[userIndex].updatedAt =
    new Date().toISOString();

    await writeUsers(users);

    const { password, ...safeUser } = users[userIndex];

    return {
        success: true,
        message: "User updated successfully.",
        data: safeUser
    };

};

export const deleteUser = async (id: string) => {

    const users = await readUsers();

    const userIndex = users.findIndex(
        (user: User) => user.id === id
    );

    if (userIndex === -1) {
        throw new AppError(
    "User not found.",
    404
);
    }

    users.splice(userIndex, 1);

    await writeUsers(users);

    return {
        success: true,
        message: "User deleted successfully."
    };

};