import { Navigate, Outlet } from "react-router-dom";

const hasLoggedInUser = () => Boolean(localStorage.getItem("token") && localStorage.getItem("user"));

export function ProtectedRoute() {
  return hasLoggedInUser() ? <Outlet /> : <Navigate to="/login" replace />;
}

export function PublicOnlyRoute() {
  return hasLoggedInUser() ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
