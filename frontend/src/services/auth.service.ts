import api from "../api/axios";

import type {
    LoginData,
    RegisterData,
    ChangePasswordData,
     LoginResponse,
} from "../types/auth";

// ==========================
// Register
// ==========================

export const register = async (data: RegisterData) => {

    const response = await api.post("/auth/register", data);

    return response.data;

};

// ==========================
// Login
// ==========================

export const login = async (
    data: LoginData
): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>(
        "/auth/login",
        data
    );

    return response.data;
};
// ==========================
// Logout
// ==========================

export const logout = async (refreshToken: string) => {

    const response = await api.post("/auth/logout", {
        refreshToken,
    });

    return response.data;

};

// ==========================
// Get Profile
// ==========================

export const getProfile = async () => {

    const response = await api.get("/auth/profile");

    return response.data;

};

// ==========================
// Change Password
// ==========================

export const changePassword = async (
    data: ChangePasswordData
) => {

    const response = await api.put(
        "/auth/change-password",
        data
    );

    return response.data;

};

// ==========================
// Refresh Token
// ==========================

export const refreshToken = async (
    refreshToken: string
) => {

    const response = await api.post(
        "/auth/refresh-token",
        {
            refreshToken,
        }
    );

    return response.data;

};