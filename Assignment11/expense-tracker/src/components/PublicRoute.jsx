import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );
}

export default PublicRoute;