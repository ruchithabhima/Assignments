import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
