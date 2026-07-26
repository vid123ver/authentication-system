import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/users/UserForm";

import { createUser } from "../services/user.service";

import { toast } from "react-toastify";

const AddUser = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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

            toast.success("User created successfully!");

            navigate("/users");

        } catch (error: any) {

            toast.error(

                error?.response?.data?.message ||

                "Failed to create user."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold text-center mt-8 mb-6">

                Add User

            </h1>

            <UserForm
                onSubmit={handleSubmit}
                loading={loading}
                submitButtonText="Create User"
            />

        </div>

    );

};

export default AddUser;