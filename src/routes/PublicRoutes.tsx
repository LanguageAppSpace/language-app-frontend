import { Navigate, Outlet } from "react-router-dom";
import { ROUTE } from "@/config/route.config";

const PublicRoutes = () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    return <Navigate to={ROUTE.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
