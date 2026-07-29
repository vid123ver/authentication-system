export interface JwtPayload {
    id: string;
    email: string;
    role: "Admin" | "User";
}