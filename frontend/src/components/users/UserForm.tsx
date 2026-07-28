import { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";
import Select from "../common/Select";

interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: "Admin" | "User";
}

interface UserFormProps {
    initialValues?: UserFormData;
    onSubmit: (data: UserFormData) => void;
    loading?: boolean;
    submitButtonText: string;
    showPassword?: boolean;
}

const UserForm = ({
    initialValues,
    onSubmit,
    loading = false,
    submitButtonText,
    showPassword = true,
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

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

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

                    {showPassword && (
    <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
    />
)}

                    <Select
    label="Role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    options={[
        {
            label: "User",
            value: "User",
        },
        {
            label: "Admin",
            value: "Admin",
        },
    ]}
/>

                    <Button
                        type="submit"
                        loading={loading}
                    >

                        {submitButtonText}

                    </Button>

                </form>

            </div>

        </div>

    );

};

export default UserForm;