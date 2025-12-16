import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import BackButton from "@/components/Buttons/BackButton";
import Navigation from "@/components/Navigation/Navigation";

const AuthLayout = () => {
  return (
    <LoginWrapper>
      <Navigation />
      <BackButton />
      <Outlet />
    </LoginWrapper>
  );
};

export default AuthLayout;

const LoginWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "56px 0 48px 0",
}));
