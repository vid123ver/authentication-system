import { useEffect, useState } from "react";
import { getUsers } from "../services/user.service";
import type { User } from "../types/user";
import UserTable from "../components/users/UserTable";
import { Link } from "react-router-dom";

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

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

        fetchUsers();

    }, []);

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
            <UserTable users={users} />

        </div>
    );

};

export default Users;