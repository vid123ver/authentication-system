import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import UserForm from "../components/users/UserForm";

import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

import {
    updateUserSchema,
    type UpdateUserFormData,
} from "../schemas/user.schema";

import {
    getUserById,
    updateUser,
} from "../services/user.service";

import { toast } from "react-toastify";

const EditUser = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [isActive, setIsActive] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
    });

    useEffect(() => {

        const fetchUser = async () => {

            try {

                if (!id) return;

                const user = await getUserById(id);

                reset({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                });

                setIsActive(user.isActive);

            } catch {

                toast.error("Failed to fetch user.");

            }

        };

        fetchUser();

    }, [id, reset]);

    const onSubmit = async (
        data: UpdateUserFormData
    ) => {

        if (!id) return;

        try {

            setLoading(true);

            await updateUser(id, {
                ...data,
                isActive,
            });

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

    if (loading && !id) {

        return <Loader />;

    }

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Edit User

                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <UserForm
                        register={register}
                        errors={errors}
                    />

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">

                        <div>

                            <p className="font-medium text-gray-800">
                                Account Status
                            </p>

                            <p className="text-sm text-gray-500">
                                {isActive
                                    ? "User account is active"
                                    : "User account is inactive"}
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() => setIsActive(!isActive)}
                            className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                                isActive
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {isActive
                                ? "Deactivate"
                                : "Activate"}
                        </button>

                    </div>

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