import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUsers, deleteUser } from "../services/user.service";
import type { User } from "../types/user";
import UserTable from "../components/users/UserTable";

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const handleDelete = async (id: string) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        try {

            await deleteUser(id);

            alert("User deleted successfully.");

            fetchUsers();

        } catch (error: any) {

            alert(
                error?.response?.data?.message ||
                "Failed to delete user."
            );

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

            <br /><br />

            <UserTable
                users={users}
                onDelete={handleDelete}
            />

        </div>
    );

};

export default Users;