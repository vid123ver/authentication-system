import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import Users from "../pages/Users";
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
        <PrivateRoute>
            <Users />
        </PrivateRoute>
    }
/>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;