import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUsers, deleteUser } from "../services/user.service";
import type { User } from "../types/user";

import UserTable from "../components/users/UserTable";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

import { toast } from "react-toastify";

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedUserId, setSelectedUserId] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {

        try {

            const data = await getUsers();

            setUsers(data);

        } catch (error: any) {

            setError(

                error?.response?.data?.message ||

                "Failed to fetch users."

            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchUsers();

    }, []);

    const handleDelete = (id: string) => {

        setSelectedUserId(id);

        setDialogOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteUser(selectedUserId);

            toast.success("User deleted successfully!");

            fetchUsers();

        } catch (error: any) {

            toast.error(

                error?.response?.data?.message ||

                "Failed to delete user."

            );

        } finally {

            setDialogOpen(false);

            setSelectedUserId("");

        }

    };

    const search = searchTerm.trim().toLowerCase();

    const filteredUsers = users.filter((user) => {

        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

        const email = user.email.toLowerCase();

        return (

            fullName.includes(search) ||

            email.includes(search)

        );

    });

    if (loading) {

        return <Loader />;

    }

    if (error) {

        return (

            <div className="flex justify-center mt-10">

                <p className="text-red-500 font-medium">

                    {error}

                </p>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <div className="flex items-center justify-between mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">

                        Users

                    </h1>

                    <Link to="/users/add">

                        <Button className="w-auto">

                            Add User

                        </Button>

                    </Link>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <div className="mb-4">

                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <UserTable
                        users={filteredUsers}
                        onDelete={handleDelete}
                    />

                </div>

            </div>

            <ConfirmDialog
                open={dialogOpen}
                title="Delete User"
                message="Are you sure you want to delete this user?"
                onConfirm={confirmDelete}
                onCancel={() => {

                    setDialogOpen(false);

                    setSelectedUserId("");

                }}
            />

        </div>

    );

};

export default Users;