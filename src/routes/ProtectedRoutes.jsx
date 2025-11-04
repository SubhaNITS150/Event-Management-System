import { Navigate } from "react-router-dom";
import { useAuthStore } from "../services/authservices/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  if(loading) return null;

  return isAuthenticated ? children : <Navigate to="/signup" replace />;

  return children;
};


export default ProtectedRoute;