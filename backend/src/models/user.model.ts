// User- Model contains these fields

// id
// firstName
// lastName
// email
// password
// role
// isActive
// createdAt
// // updatedAt
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "Admin" | "User";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}