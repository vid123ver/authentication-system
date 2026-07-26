import { useState } from "react";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { changePassword } from "../services/auth.service";

import { toast } from "react-toastify";

const ChangePassword = () => {

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
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

            toast.success("Password changed successfully!");

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

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800">

                    Change Password

                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">

                    Update your account password.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <Input
                        label="Old Password"
                        type="password"
                        name="oldPassword"
                        placeholder="Enter old password"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="New Password"
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
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

                        Change Password

                    </Button>

                </form>

            </div>

        </div>

    );

};

export default ChangePassword;