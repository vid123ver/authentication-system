import axios from "axios";
import { refreshToken } from "../services/auth.service";

const api = axios.create({

    baseURL: "http://localhost:5002",

    headers: {

        "Content-Type": "application/json",

    },

    withCredentials: true,

});

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem(
                "accessToken"
            );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

// -----------------------------
// Response Interceptor
// -----------------------------

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest =
            error.config;

        if (

            error.response?.status === 401 &&

            !originalRequest._retry

        ) {

            originalRequest._retry = true;

            try {

                const storedRefreshToken =
    localStorage.getItem("refreshToken");

if (!storedRefreshToken) {

    throw new Error("Refresh token not found");

}

const response =
    await refreshToken(
        storedRefreshToken
    );

const newAccessToken =
    response.accessToken;

                localStorage.setItem(

                    "accessToken",

                    newAccessToken

                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch {

                localStorage.removeItem(
                    "accessToken"
                );

                localStorage.removeItem(
                    "refreshToken"
                );

                window.location.href =
                    "/login";

            }

        }

        return Promise.reject(error);

    }

);

export default api;