import type { User } from "../../types/user";
import { Link } from "react-router-dom";

interface UserTableProps {
    users: User[];
    onDelete: (id: string) => void;
    isSearching: boolean;
}

const UserTable = ({ users, onDelete, isSearching }: UserTableProps) => {

    return (

        <div className="overflow-x-auto">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                            First Name
                        </th>

                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                            Last Name
                        </th>

                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                            Email
                        </th>

                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                            Role
                        </th>

                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                            Status
                        </th>

                        <th className="px-6 py-4 text-center font-semibold text-gray-700">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

    {users.length === 0 ? (

        <tr>

            <td
                colSpan={6}
                className="px-6 py-12 text-center text-gray-500"
            >

                <div className="flex flex-col items-center gap-2">

                    <span className="text-5xl">
                        👥
                    </span>

                    <h3 className="text-lg font-semibold text-gray-700">
    {isSearching
        ? "No users match your search."
        : "No users have been added yet."}
</h3>

<p className="text-sm text-gray-500">
    {isSearching
        ? "Try searching with a different name or email."
        : 'Click the "Add User" button to create your first user.'}
</p>

                </div>

            </td>

        </tr>

    ) : (

        users.map((user) => (

            <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition-colors"
            >

                <td className="px-6 py-4">
                    {user.firstName}
                </td>

                <td className="px-6 py-4">
                    {user.lastName}
                </td>

                <td className="px-6 py-4">
                    {user.email}
                </td>

                <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        {user.role}
                    </span>

                </td>

                <td className="px-6 py-4">

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {user.isActive
                            ? "Active"
                            : "Inactive"}
                    </span>

                </td>

                <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-3">

                        <Link
                            to={`/users/edit/${user.id}`}
                        >

                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition"
                            >
                                Edit
                            </button>

                        </Link>

                        <button
                            type="button"
                            onClick={() => onDelete(user.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
                        >
                            Delete
                        </button>

                    </div>

                </td>

            </tr>

        ))

    )}

</tbody>

            </table>

        </div>

    );

};

export default UserTable;