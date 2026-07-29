import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { register as registerUser } from "../services/auth.service";

import {
    registerSchema,
    type RegisterFormData,
} from "../schemas/register.schema";

const Register = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const onSubmit = async (
        data: RegisterFormData
    ) => {

        setError("");

        try {

            setLoading(true);

            await registerUser({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            });

            toast.success("Registration successful!");

            navigate("/login");

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Registration failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Fill in the details below to register.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <Input
                        label="First Name"
                        placeholder="Enter first name"
                        error={errors.firstName?.message}
                        {...register("firstName")}
                    />

                    <Input
                        label="Last Name"
                        placeholder="Enter last name"
                        error={errors.lastName?.message}
                        {...register("lastName")}
                    />

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
                        placeholder="Enter password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm password"
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword")}
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
                        Register
                    </Button>

                </form>

                <p className="mt-6 text-center text-gray-600">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;