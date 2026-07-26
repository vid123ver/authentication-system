import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import Users from "../pages/Users";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
    path="/dashboard"
    element={
        <PrivateRoute>
            <Dashboard />
        </PrivateRoute>
    }
/>
<Route
    path="/register"
    element={<Register />}
/>
<Route
    path="/profile"
    element={
        <PrivateRoute>
            <Profile />
        </PrivateRoute>
    }
/>
<Route
    path="/change-password"
    element={
        <PrivateRoute>
            <ChangePassword />
        </PrivateRoute>
    }
/>
<Route
    path="/users"
    element={
        <AdminRoute>
            <Users />
        </AdminRoute>
    }
/>
<Route
    path="/users/add"
    element={
        <AdminRoute>
            <AddUser />
        </AdminRoute>
    }
/>

<Route
    path="/users/edit/:id"
    element={
        <AdminRoute>
            <EditUser />
        </AdminRoute>
    }
/>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;