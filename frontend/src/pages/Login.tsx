import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { useAuth } from "../hooks/useAuth";

import {
    loginSchema,
    type LoginFormData,
} from "../schemas/login.schema";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const onSubmit = async (
        data: LoginFormData
    ) => {

        try {

            setLoading(true);

            setError("");

            await login(data);

            navigate("/dashboard");

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Authentication System
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Welcome back! Please login to continue.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Login
                    </Button>

                </form>

                <p className="mt-6 text-center text-gray-600">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;