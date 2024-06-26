import { ROUTE } from "@/config/route.config";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/auth/authSlice";

const ProtectedRoute = () => {
  const isToken = useSelector(selectCurrentToken);

  if (!isToken) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
