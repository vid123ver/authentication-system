export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
}