import type { User } from "../../types/user";
import { Link } from "react-router-dom";

interface UserTableProps {
    users: User[];
    onDelete: (id: string) => void;
}

const UserTable = ({ users, onDelete }: UserTableProps) => {
    return (
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.isActive ? "Active" : "Inactive"}</td>

                        <td>
                            <Link to={`/users/edit/${user.id}`}>
                                <button type="button">
                                    Edit
                                </button>
                            </Link>

                            <button
                                type="button"
                                style={{ marginLeft: "10px" }}
                                onClick={() => onDelete(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;