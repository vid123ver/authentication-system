import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserForm from "../components/users/UserForm";
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
                    password: "",
                    role: user.role,
                });

            } catch (error) {

                // alert("Failed to fetch user.");
                toast.error("Failed to fetch user.");

            }

        };

        fetchUser();

    }, [id]);

    const handleSubmit = async (formData: any) => {

        try {

            if (!id) return;

            setLoading(true);

            await updateUser(id, formData);

            // alert("User updated successfully.");
            toast.success("User updated successfully!");

            navigate("/users");

        } catch (error: any) {

            // alert(
            //     error?.response?.data?.message ||
            //     "Failed to update user."
            // );
            toast.error(
    error?.response?.data?.message ||
    "Failed to update user."
);

        } finally {

            setLoading(false);

        }

    };

    if (!initialValues) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <h1>Edit User</h1>

            <UserForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                loading={loading}
                submitButtonText="Update User"
            />

        </div>

    );

};

export default EditUser;