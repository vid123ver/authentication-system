import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/users/UserForm";
import Toast from "../components/common/Toast";
import { createUser } from "../services/user.service";

const AddUser = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        type: "success" as "success" | "error",
    });

    useEffect(() => {

        if (!toast.message) return;

        const timer = setTimeout(() => {

            setToast({
                message: "",
                type: "success",
            });

        }, 3000);

        return () => clearTimeout(timer);

    }, [toast]);

    const handleSubmit = async (formData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: "Admin" | "User";
    }) => {

        try {

            setLoading(true);

            await createUser(formData);

            setToast({
                message: "User created successfully!",
                type: "success",
            });

            setTimeout(() => {
                navigate("/users");
            }, 1000);

        } catch (error: any) {

            setToast({
                message:
                    error?.response?.data?.message ||
                    "Failed to create user.",
                type: "error",
            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <Toast
                message={toast.message}
                type={toast.type}
            />

            <h1>Add User</h1>

            <UserForm
                onSubmit={handleSubmit}
                loading={loading}
                submitButtonText="Create User"
            />

        </div>

    );

};

export default AddUser;