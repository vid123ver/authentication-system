import {
    createContext,
    useState,
    useEffect,
} from "react";

import type{
    ReactNode
}
from "react";
import {
    login as loginService,
    logout as logoutService,
    getProfile,
} from "../services/auth.service";

import type {
    LoginData,
} from "../types/auth";

import type {
    User,
} from "../types/user";

interface AuthContextType {

    user: User | null;

    loading: boolean;

    isAuthenticated: boolean;

    login: (
        data: LoginData
    ) => Promise<void>;

    logout: () => Promise<void>;

}

export const AuthContext =
    createContext<AuthContextType>(
        {} as AuthContextType
    );

interface Props {

    children: ReactNode;

}

export const AuthProvider = ({
    children,
}: Props) => {

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

   
    // Login
    

    const login = async (
        data: LoginData
    ) => {

        const response =
            await loginService(data);

        localStorage.setItem(
            "accessToken",
            response.accessToken
        );

        localStorage.setItem(
            "refreshToken",
            response.refreshToken
        );

        const profile =
            await getProfile();

        setUser(profile.data);

    };

    
    // Logout
    

    const logout = async () => {

        const refreshToken =
            localStorage.getItem(
                "refreshToken"
            );

        if (refreshToken) {

            await logoutService(
                refreshToken
            );

        }

        localStorage.removeItem(
            "accessToken"
        );

        localStorage.removeItem(
            "refreshToken"
        );

        setUser(null);

    };

    
    // Restore Login
    

    useEffect(() => {

        const loadUser = async () => {

            try {

                const token =
                    localStorage.getItem(
                        "accessToken"
                    );

                if (!token) {

                    setLoading(false);

                    return;

                }

                const profile =
                    await getProfile();

                setUser(profile.data);

            } catch {

                localStorage.removeItem(
                    "accessToken"
                );

                localStorage.removeItem(
                    "refreshToken"
                );

                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        loadUser();

    }, []);

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                isAuthenticated:
                    !!user,

                login,

                logout,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};