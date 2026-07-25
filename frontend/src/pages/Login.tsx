import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            await login({
                email,
                password,
            });

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

        <div>

            <h1>Login</h1>

            <form
                onSubmit={handleSubmit}
            >

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
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

                            ? "Logging in..."

                            : "Login"

                    }

                </button>

            </form>

        </div>

    );

};

export default Login;