import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserForm from "../components/users/UserForm";
import Loader from "../components/common/Loader";

import { getUserById, updateUser } from "../services/user.service";

import { toast } from "react-toastify";

const EditUser = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {

        const fetchUser = async () => {

            try {

                if (!id) return;

                const user = await getUserById(id);

                setInitialValues({
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

    const handleSubmit = async (formData: any) => {

        if (!id) return;

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

    if (!initialValues) {

        return <Loader />;

    }

    return (

        <div>

            <h1 className="text-3xl font-bold text-center mt-8 mb-6">

                Edit User

            </h1>

            <UserForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                loading={loading}
                submitButtonText="Update User"
                showPassword={false}
            />

        </div>

    );

};

export default EditUser;