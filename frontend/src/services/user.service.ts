import api from "../api/axios";
import type { User } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data.data;
};

export const getUserById = async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data.data;
};

export const createUser = async (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "Admin" | "User";
}) => {
    const response = await api.post("/users", user);
    return response.data;
};

export const updateUser = async (
    id: string,
    user: Partial<User>
) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};