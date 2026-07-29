import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import ConfirmDialog from "../common/ConfirmDialog";

const Navbar = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const {
        user,
        logout,
        isAuthenticated,
    } = useAuth();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = async () => {

        await logout();
        setShowLogoutDialog(false);
        navigate("/login");

    };

    if (!isAuthenticated) {

        return null;

    }

    const linkClass = (path: string) =>
        `px-3 py-2 rounded-md transition-colors duration-200 ${
            location.pathname === path
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`;

    return (

        <nav className="bg-gray-900 shadow-md">

            <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

                {/* Left Section */}

                <div className="flex items-center gap-10">

                    <Link
                        to="/dashboard"
                        className="text-2xl font-bold text-white"
                    >
                        Auth System
                    </Link>

                    <div className="flex items-center gap-2">

                        <Link
                            to="/dashboard"
                            className={linkClass("/dashboard")}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/profile"
                            className={linkClass("/profile")}
                        >
                            Profile
                        </Link>

                        <Link
                            to="/change-password"
                            className={linkClass("/change-password")}
                        >
                            Change Password
                        </Link>

                        {user?.role === "Admin" && (

                            <Link
                                to="/users"
                                className={linkClass("/users")}
                            >
                                Users
                            </Link>

                        )}

                    </div>

                </div>

                {/* Right Section */}

                <div className="flex items-center gap-4">

                    <div className="text-right">

                        <p className="text-white font-medium">

                            {user?.firstName} {user?.lastName}

                        </p>

                        <p className="text-xs text-gray-400">

                            {user?.role}

                        </p>

                    </div>

                    <button
                        onClick={() => setShowLogoutDialog(true)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        Logout
                    </button>

                </div>

            </div>
            <ConfirmDialog
    open={showLogoutDialog}
    title="Logout"
    message="Are you sure you want to logout?"
    confirmText="Logout"
    cancelText="Cancel"
    onConfirm={handleLogout}
    onCancel={() => setShowLogoutDialog(false)}
/>
        </nav>

    );

};

export default Navbar;