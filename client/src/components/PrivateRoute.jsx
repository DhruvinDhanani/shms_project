import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  // If no user, redirect to login
  if (!user) return <Navigate to="/" />;

  // If user's role is not allowed, redirect to login
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // User is allowed
  return children;
};

export default PrivateRoute;
