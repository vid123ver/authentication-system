import type { User } from "../../types/user";

interface UserTableProps {
    users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
    return (
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
    {users.map((user) => (
        <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.isActive ? "Active" : "Inactive"}</td>

            <td>
                <button>Edit</button>

                <button
                    style={{ marginLeft: "10px" }}
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