import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("task-user-info");
  if (isAuthenticated) return <React.Fragment>{children}</React.Fragment>;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
