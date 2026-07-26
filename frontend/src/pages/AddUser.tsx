import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/users/UserForm";
import { createUser } from "../services/user.service";

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

            alert("User created successfully!");

            navigate("/users");

        } catch (error: any) {

            alert(
                error?.response?.data?.message ||
                "Failed to create user."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div>

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