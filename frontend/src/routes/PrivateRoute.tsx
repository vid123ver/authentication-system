import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;

};

export default PrivateRoute;