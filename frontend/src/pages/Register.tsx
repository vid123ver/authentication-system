import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { register } from "../services/auth.service";
import { toast } from "react-toastify";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            await register({

                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,

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
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <Input
                        label="First Name"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    {

                        error && (

                            <p className="text-sm text-red-500">

                                {error}

                            </p>

                        )

                    }

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