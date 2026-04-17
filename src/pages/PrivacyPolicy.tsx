import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
interface PrivacySection {
  title: string;
  text: string;
  list?: {
    text: string;
    label?: string;
  }[];
  footer?: string;
  email?: string;
}
const PrivacyPolicy = () => {
  const { t } = useTranslation("privacyPolicy");

  const sections = t("sections", {
    returnObjects: true,
  }) as PrivacySection[];

  return (
    <Wrapper>
      <Container maxWidth="md">
        <PageTitle variant="h4">{t("title")}</PageTitle>
        {sections.map((section) => (
          <Section key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            <BodyText>{section.text}</BodyText>
            {section.list && (
              <BodyText>
                <ul>
                  {section.list.map((item, i) => (
                    <li key={i}>
                      {item.label && <strong>{item.label}: </strong>}
                      {item.text}
                    </li>
                  ))}
                </ul>
              </BodyText>
            )}
            {section.footer && (
              <BodyText>
                {section.footer}{" "}
                {section.email && <strong>{section.email}</strong>}
              </BodyText>
            )}
          </Section>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(16, 0),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  marginBottom: theme.spacing(2),
}));

const BodyText = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  lineHeight: 1.6,
  "& ul": {
    margin: 0,
    paddingLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default PrivacyPolicy;
