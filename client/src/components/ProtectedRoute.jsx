import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../services/auth";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  return children;
}
