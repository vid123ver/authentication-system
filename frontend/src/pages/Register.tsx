import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/auth.service";
import { toast } from "react-toastify/unstyled";

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

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

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

            // alert(
            //     "Registration Successful!"
            // );
            toast.success("User updated successfully!");

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

        <div>

            <h1>Register</h1>

            <form
                onSubmit={handleSubmit}
            >

                <input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <br /><br />

                {

                    error &&

                    <p>

                        {error}

                    </p>

                }

                <button
                    type="submit"
                    disabled={loading}
                >

                    {

                        loading
                            ? "Registering..."
                            : "Register"

                    }

                </button>

            </form>

        </div>

    );

};

export default Register;