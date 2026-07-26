import { useState } from "react";

interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "Admin" | "User";
}

interface UserFormProps {
    initialValues?: UserFormData;
    onSubmit: (data: UserFormData) => void;
    loading?: boolean;
    submitButtonText: string;
}

const UserForm = ({
    initialValues,
    onSubmit,
    loading = false,
    submitButtonText,
}: UserFormProps) => {

    const [formData, setFormData] = useState<UserFormData>(
        initialValues || {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "User",
        }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <form onSubmit={handleSubmit}>

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

            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
            >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>

            <br /><br />

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Please wait..." : submitButtonText}
            </button>

        </form>

    );

};

export default UserForm;