import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // If there's no token or user data, redirect to login
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // If the user is not a staff member and tries to access /FormsAdmin, redirect to /dashboard
  if (window.location.pathname === "/FormsAdmin" && !user.is_staff) {
    return <Navigate to="/FormsUser" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;