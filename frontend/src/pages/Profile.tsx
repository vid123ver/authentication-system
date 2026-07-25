import { useAuth } from "../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return <h2>User not found.</h2>;
    }

    return (
        <div>
            <h1>My Profile</h1>

            <hr />

            <p>
                <strong>First Name:</strong> {user.firstName}
            </p>

            <p>
                <strong>Last Name:</strong> {user.lastName}
            </p>

            <p>
                <strong>Email:</strong> {user.email}
            </p>

            <p>
                <strong>Role:</strong> {user.role}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {user.isActive ? "Active" : "Inactive"}
            </p>

            <p>
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt).toLocaleString()}
            </p>
        </div>
    );
};

export default Profile;