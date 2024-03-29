import Login from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
};

export default App;
