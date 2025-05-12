import { ROUTE } from "@/config/route.config.ts";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/auth/authSlice.ts";

const ProtectedRoute = () => {
  const isToken = useSelector(selectCurrentToken);

  if (!isToken) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
