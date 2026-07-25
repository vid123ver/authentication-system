export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "Admin" | "User";
    isActive: boolean;
    createdAt: string;
}