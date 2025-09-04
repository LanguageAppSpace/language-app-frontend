import Login from "@/Login/Login";
import SignUpForm from "@/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTE } from "@/config/route.config";
import Dashboard from "@/UserDashboard/Main.tsx";
import ProtectedRoutes from "@/routes/ProtectedRoutes.tsx";
import LandingPage from "@/LandingPage/LandingPage.tsx";
import Page404 from "@/pages/Page404.tsx";
import UserSettings from "@/Profile/UserSettings.tsx";
import CreateEditLesson from "@/Lessons/CreateEditLesson.tsx";
import PublicLayout from "@/layouts/Public/PublicLayout";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import UserDashboardLayout from "@/layouts/UserDashboard/Layout.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import ForgotPassword from "@/ForgotPassword/ForgotPassword";
import ResetPassword from "@/ResetPassword/ResetPassword";
import LearnMore from "@/LandingPage/LearnMore.tsx";
import Support from "@/pages/Support";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={ROUTE.LANDING_PAGE} replace />}
        />
        <Route element={<PublicLayout />}>
          <Route path={ROUTE.LANDING_PAGE} element={<LandingPage />} />
          <Route path={ROUTE.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={ROUTE.SUPPORT} element={<Support />} />
        </Route>
        <Route path={ROUTE.PAGE404} element={<Page404 />} />
        <Route path={ROUTE.LEARN_MORE} element={<LearnMore />} />
        <Route element={<AuthLayout />}>
          <Route path={ROUTE.LOGIN} element={<Login />} />
          <Route path={ROUTE.REGISTER} element={<SignUpForm />} />
          <Route path={ROUTE.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTE.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<UserDashboardLayout />}>
            <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTE.USER_SETTINGS} element={<UserSettings />} />
            <Route path={ROUTE.CREATE_LESSON} element={<CreateEditLesson />} />
            <Route path={ROUTE.EDIT_LESSON} element={<CreateEditLesson />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
