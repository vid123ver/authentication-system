import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import UserForm from "../components/users/UserForm";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import {
    createUserSchema,
    type CreateUserFormData,
} from "../schemas/user.schema";

import { createUser } from "../services/user.service";

import { toast } from "react-toastify";

const AddUser = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "User",
        },
    });

    const onSubmit = async (
        data: CreateUserFormData
    ) => {

        try {

            setLoading(true);

            await createUser(data);

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

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Add User

                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <UserForm
                        register={register}
                        errors={errors}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <Button
                        type="submit"
                        loading={loading}
                    >

                        Create User

                    </Button>

                </form>

            </div>

        </div>

    );

};

export default AddUser;