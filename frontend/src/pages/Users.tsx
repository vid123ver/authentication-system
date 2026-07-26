import { useEffect, useState } from "react";
import { getUsers } from "../services/user.service";
import type { User } from "../types/user";

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

            <table
                border={1}
                cellPadding={10}
                cellSpacing={0}
            >

                <thead>

                    <tr>

                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.firstName}</td>

                                <td>{user.lastName}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>
                                    {user.isActive ? "Active" : "Inactive"}
                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>
    );

};

export default Users;