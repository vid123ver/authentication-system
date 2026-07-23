import { randomUUID } from "crypto";

export const generateId = (): string => {
    return randomUUID();// randomUUID is the function in crypto library
    //UUID -> Universally Unique Identifier
};