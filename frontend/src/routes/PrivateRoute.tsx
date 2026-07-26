import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    if (loading) {
    return <Loader />;
}

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;

};

export default PrivateRoute;