import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!user) return <Navigate to="/login" />; // not logged in
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />; // role not allowed

  return children;
};

export default PrivateRoute;
