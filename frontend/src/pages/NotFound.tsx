import { Link } from "react-router-dom";

const NotFound = () => {
    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

            <h1 className="text-8xl font-bold text-blue-600">
                404
            </h1>

            <h2 className="mt-4 text-3xl font-semibold text-gray-800">
                Page Not Found
            </h2>

            <p className="mt-3 text-center text-gray-600 max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>

            <Link
                to="/dashboard"
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
                Go to Dashboard
            </Link>

        </div>

    );
};

export default NotFound;