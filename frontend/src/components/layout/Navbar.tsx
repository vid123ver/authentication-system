import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {

    const navigate = useNavigate();

    const {
        user,
        logout,
        isAuthenticated,
    } = useAuth();

    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    if (!isAuthenticated) {
        return null;
    }

    return (

        <nav className="bg-gray-800 text-white px-6 py-4">

            <div className="flex items-center justify-between">

                <div className="flex gap-6">

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/profile">
                        Profile
                    </Link>

                    <Link to="/change-password">
                        Change Password
                    </Link>

                    {user?.role === "Admin" && (

                        <Link to="/users">
                            Users
                        </Link>

                    )}

                </div>

                <div className="flex items-center gap-4">

                    <span>
                        {user?.firstName}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;