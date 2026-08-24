import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export function AdminRoute() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
}
