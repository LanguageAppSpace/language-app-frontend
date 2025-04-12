import Login from "@/Features/Auth/Login.tsx";
import SignUpForm from "@/Features/Auth/Register.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTE } from "@config/route.config";
import Dashboard from "@/Layouts/Dashboard/Dashboard.tsx";
import ProtectedRoutes from "@/Routes/ProtectedRoutes.tsx";
import PageLandingPage from "@pages/PageLandingPage";
import Page404 from "@pages/Page404";
import UserSettings from "@/Features/Profile/UserSettings.tsx";
import CreateEditLesson from "@/Features/Lessons/CreateEditLesson.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={ROUTE.LANDING_PAGE} replace />}
        />
        <Route path={ROUTE.LANDING_PAGE} element={<PageLandingPage />} />
        <Route path={ROUTE.PAGE404} element={<Page404 />} />
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route path={ROUTE.REGISTER} element={<SignUpForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTE.USER_SETTINGS} element={<UserSettings />} />
          <Route path={ROUTE.CREATE_LESSON} element={<CreateEditLesson />} />
          <Route path={ROUTE.EDIT_LESSON} element={<CreateEditLesson />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
