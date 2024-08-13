import React from "react";
import { FooterStyled } from "./Footer.styled";

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <FooterStyled>{children}</FooterStyled>;
};

export default Footer;
