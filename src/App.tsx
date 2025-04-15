import Login from "@components/Auth/Login.tsx";
import SignUpForm from "@components/Auth/Register.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTE } from "@config/route.config";
import Dashboard from "@components/Layouts/Dashboard/Dashboard.tsx";
import ProtectedRoutes from "@components/Routes/ProtectedRoutes.tsx";
import PageLandingPage from "@components/Pages/PageLandingPage.tsx";
import Page404 from "@components/Pages/Page404.tsx";
import UserSettings from "@components/Profile/UserSettings.tsx";
import CreateEditLesson from "@components/Lessons/CreateEditLesson.tsx";

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
