import { useState } from "react";
import { changePassword } from "../services/auth.service";

const ChangePassword = () => {

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
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

        setMessage("");
        setError("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            await changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            });

            setMessage("Password changed successfully.");

            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (error: any) {

            setError(
                error?.response?.data?.message ||
                "Failed to change password."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <h1>Change Password</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
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

                {error && <p>{error}</p>}

                {message && <p>{message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Updating..."
                        : "Change Password"}
                </button>

            </form>

        </div>
    );

};

export default ChangePassword;