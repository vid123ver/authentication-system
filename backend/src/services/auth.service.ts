import { User } from "../models/user.model";
import { readUsers , writeUsers} from "../utils/file.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateId } from "../utils/helpers";

export const register = async (
    data: Partial<User>
) => {

    // Read all users
    const users = await readUsers();

    // Check if email already exists
    const existingUser = users.find(
        (user: User) => user.email === data.email
    );

    if (existingUser) {
        throw new Error("User with this email already exists.");
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password!);

    // Create new user object
    const newUser: User = {
        id: generateId(),
        firstName: data.firstName!,
        lastName: data.lastName!,
        email: data.email!,
        password: hashedPassword,
        role: data.role ?? "User",
        isActive: data.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);

    await writeUsers(users);

    // Return response
    return {
        success: true,
        message: "User registered successfully",
        data: newUser
    };

};


/*     --------    <---LOGIN--->    --------     */ 

export const login = async (
    data: {
        email: string;
        password: string;
    }
) => {

    // Read all users
    const users = await readUsers();

    // Find user by email
    const user = users.find(
        (user: User) => user.email === data.email
    );

    if (!user) {
        throw new Error("Invalid email or password.");
    }
    const isPasswordCorrect = await comparePassword(
        data.password,
        user.password
    );

    // Check password
    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password.");
    }

    return {
        success: true,
        message: "Login successful.",
        data: user
    };
    
};