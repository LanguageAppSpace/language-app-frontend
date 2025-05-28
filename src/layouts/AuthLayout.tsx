import React from "react";
import { styled } from "@mui/material/styles";
import Navigation from "@/Landing Page/Navigation";
import BackButton from "@/components/Buttons/BackButton";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <LoginWrapper>
      <Navigation />
      <BackButton />
      {children}
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
