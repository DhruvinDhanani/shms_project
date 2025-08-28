// components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const ProtectedRoute = ({ children, role }) => {
  const [user] = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
