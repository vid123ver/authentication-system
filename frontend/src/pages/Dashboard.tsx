import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {

    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Welcome {user?.firstName}</h2>

            <p>Email: {user?.email}</p>

            <p>Role: {user?.role}</p>
        </div>
    );
};

export default Dashboard;