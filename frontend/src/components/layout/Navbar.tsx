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

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {

        await logout();

        setShowLogoutDialog(false);

        setMobileMenuOpen(false);

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

            <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-16 flex items-center justify-between">

                {/* Left Section */}

                <div className="flex items-center gap-6">

                    <Link
                        to="/dashboard"
                        className="text-2xl font-bold text-white"
                    >
                        Auth System
                    </Link>

                    {/* Desktop Navigation */}

                    <div className="hidden md:flex items-center gap-2">

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

                {/* Desktop Right Section */}

                <div className="hidden md:flex items-center gap-4">

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

                {/* Mobile Menu Button */}

                <div className="md:hidden">

                    <button
                        onClick={() =>
                            setMobileMenuOpen(!mobileMenuOpen)
                        }
                        className="text-white text-2xl"
                    >

                        {mobileMenuOpen ? "✕" : "☰"}

                    </button>

                </div>

            </div>

            {/* Mobile Menu */}

            {mobileMenuOpen && (

                <div className="md:hidden bg-gray-800 px-4 py-4 space-y-2">

                    <Link
                        to="/dashboard"
                        className="block text-white py-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/profile"
                        className="block text-white py-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Profile
                    </Link>

                    <Link
                        to="/change-password"
                        className="block text-white py-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Change Password
                    </Link>

                    {user?.role === "Admin" && (

                        <Link
                            to="/users"
                            className="block text-white py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Users
                        </Link>

                    )}

                    <div className="border-t border-gray-700 pt-4">

                        <p className="text-white font-medium">

                            {user?.firstName} {user?.lastName}

                        </p>

                        <p className="text-gray-400 text-sm mb-4">

                            {user?.role}

                        </p>

                        <button
                            onClick={() => {

                                setMobileMenuOpen(false);

                                setShowLogoutDialog(true);

                            }}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors duration-200"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            )}

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