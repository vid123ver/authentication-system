import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {

    const { user } = useAuth();

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-8">

                    Dashboard

                </h1>

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-2xl font-semibold text-gray-800">

                        Welcome, {user?.firstName} 👋

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Here are your account details.

                    </p>

                    <div className="mt-8 space-y-4">

                        <div className="flex justify-between border-b pb-3">

                            <span className="font-medium text-gray-700">

                                First Name

                            </span>

                            <span>

                                {user?.firstName}

                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="font-medium text-gray-700">

                                Email

                            </span>

                            <span>

                                {user?.email}

                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="font-medium text-gray-700">

                                Role

                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    user?.role === "Admin"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-green-100 text-green-700"
                                }`}
                            >

                                {user?.role}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;