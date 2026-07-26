import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUsers, deleteUser } from "../services/user.service";
import type { User } from "../types/user";
import UserTable from "../components/users/UserTable";
import ConfirmDialog from "../components/common/ConfirmDialog";

import { toast } from "react-toastify";

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedUserId, setSelectedUserId] = useState("");

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

    if (loading) {

        return <h2>Loading users...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div>

            <h1>Users</h1>

            <Link to="/users/add">
                <button>Add User</button>
            </Link>

            <br />
            <br />

            <UserTable
                users={users}
                onDelete={handleDelete}
            />

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