import { useAuth } from "../hooks/useAuth";

const Profile = () => {

    const { user } = useAuth();

    if (!user) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h2 className="text-xl font-semibold text-red-500">

                    User not found.

                </h2>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">

                    My Profile

                </h1>

                <div className="space-y-5">

                    <div className="flex justify-between border-b pb-3">

                        <span className="font-semibold text-gray-600">
                            First Name
                        </span>

                        <span>{user.firstName}</span>

                    </div>

                    <div className="flex justify-between border-b pb-3">

                        <span className="font-semibold text-gray-600">
                            Last Name
                        </span>

                        <span>{user.lastName}</span>

                    </div>

                    <div className="flex justify-between border-b pb-3">

                        <span className="font-semibold text-gray-600">
                            Email
                        </span>

                        <span>{user.email}</span>

                    </div>

                    <div className="flex justify-between border-b pb-3">

                        <span className="font-semibold text-gray-600">
                            Role
                        </span>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.role === "Admin"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
                            {user.role}
                        </span>

                    </div>

                    <div className="flex justify-between border-b pb-3">

                        <span className="font-semibold text-gray-600">
                            Status
                        </span>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {user.isActive ? "Active" : "Inactive"}
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="font-semibold text-gray-600">
                            Created At
                        </span>

                        <span>
                            {new Date(user.createdAt).toLocaleString()}
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Profile;