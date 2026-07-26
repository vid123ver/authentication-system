import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
    children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {

    const {
        loading,
        isAuthenticated,
        user,
    } = useAuth();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "Admin") {
        return <h2>Access Denied. Admin only.</h2>;
    }

    return <>{children}</>;

};

export default AdminRoute;