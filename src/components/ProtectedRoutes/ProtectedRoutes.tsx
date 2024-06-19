import { ROUTE } from "@/config/route.config";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
  const { user, isUserLoading } = useAuth();

  if (isUserLoading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
