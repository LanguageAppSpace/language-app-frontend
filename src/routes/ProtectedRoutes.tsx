import { Navigate, Outlet } from "react-router-dom";
import { ROUTE } from "@/config/route.config";

const ProtectedRoute = () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
