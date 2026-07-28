import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserForm from "../components/users/UserForm";
import type { UserFormData } from "../components/users/UserForm";

import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

import { getUserById, updateUser } from "../services/user.service";

import { toast } from "react-toastify";

const EditUser = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<UserFormData | null>(null);

    useEffect(() => {

        const fetchUser = async () => {

            try {

                if (!id) return;

                const user = await getUserById(id);

                setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                });

            } catch {

                toast.error("Failed to fetch user.");

            }

        };

        fetchUser();

    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {

        if (!formData) return;

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!id || !formData) return;

        try {

            setLoading(true);

            await updateUser(id, formData);

            toast.success("User updated successfully!");

            navigate("/users");

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to update user."
            );

        } finally {

            setLoading(false);

        }

    };

    if (!formData) {

        return <Loader />;

    }

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Edit User

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <UserForm
                        formData={formData}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        loading={loading}
                    >

                        Update User

                    </Button>

                </form>

            </div>

        </div>

    );

};

export default EditUser;