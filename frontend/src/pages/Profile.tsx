import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../hooks/useAuth";

import UserForm from "../components/users/UserForm";

import Button from "../components/common/Button";

import {
    updateUserSchema,
    type UpdateUserFormData,
} from "../schemas/user.schema";

import { updateUser } from "../services/user.service";

import { toast } from "react-toastify";

const Profile = () => {

    const {
        user,
        refreshUser,
    } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
    });

    useEffect(() => {

        if (!user) return;

        reset({

            firstName: user.firstName,

            lastName: user.lastName,

            email: user.email,

            role: user.role,

        });

    }, [user, reset]);

    const onSubmit = async (
        data: UpdateUserFormData
    ) => {

        if (!user) return;

        try {

            setLoading(true);

            await updateUser(user.id, {

                firstName: data.firstName,

                lastName: data.lastName,

                email: data.email,

            });

            await refreshUser();

            toast.success("Profile updated successfully!");

        } catch (error: any) {

            toast.error(

                error?.response?.data?.message ||

                "Failed to update profile."

            );

        } finally {

            setLoading(false);

        }

    };

    if (!user) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h2 className="text-xl font-semibold text-red-500">

                    User not found.

                </h2>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">

                    My Profile

                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <UserForm<UpdateUserFormData>
                        register={register}
                        errors={errors}
                        showRole={false}
                    />

                    <div className="flex justify-between border-b pb-3">

                        <span className="font-semibold text-gray-600">

                            Role

                        </span>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.role === "Admin"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >

                            {user.role}

                        </span>

                    </div>

                    <div className="flex justify-between border-b pb-3">

                        <span className="font-semibold text-gray-600">

                            Status

                        </span>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >

                            {user.isActive
                                ? "Active"
                                : "Inactive"}

                        </span>

                    </div>

                    <div className="flex justify-between border-b pb-5">

                        <span className="font-semibold text-gray-600">

                            Created At

                        </span>

                        <span>

                            {new Date(
                                user.createdAt
                            ).toLocaleString()}

                        </span>

                    </div>

                    <Button
                        type="submit"
                        loading={loading}
                    >

                        Update Profile

                    </Button>

                </form>

            </div>

        </div>

    );

};

export default Profile;