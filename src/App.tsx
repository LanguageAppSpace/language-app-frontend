import Login from "@components/Login/Login";
import SignUpForm from "./components/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTE } from "@config/route.config";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route path={ROUTE.REGISTER} element={<SignUpForm />} />
        <Route path="*" element={<Navigate to={ROUTE.REGISTER} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
