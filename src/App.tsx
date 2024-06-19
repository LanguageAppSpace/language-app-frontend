import Login from "@components/Login/Login";
import SignUpForm from "@components/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTE } from "@config/route.config";
import Dashboard from "@components/Dashboard/Dashboard";
import ProtectedRoutes from "@components/ProtectedRoutes/ProtectedRoutes";
import PageLandingPage from "./pages/PageLandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE.LANDINGPAGE} element={<PageLandingPage />} />
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route path={ROUTE.REGISTER} element={<SignUpForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTE.REGISTER} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
