import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
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

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;