import { Box, Container, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

const PrivacyPolicy = () => {
  return (
    <Wrapper>
      <Container maxWidth="md">
        <PageTitle variant="h4">Privacy Policy</PageTitle>
        <Section>
          <SectionTitle variant="h6">1. Information We Collect</SectionTitle>
          <BodyText>
            <p>
              When you use the app, we may collect and store the following
              information:
            </p>
            <ul>
              <li>
                <strong>Account Information</strong>: such as your email
                address, username, and password.
              </li>
              <li>
                <strong>User-generated Content</strong>: including flashcards,
                lessons, notes, and other materials you create.
              </li>
              <li>
                <strong>Usage Data</strong>: such as your app interactions and
                activity logs.
              </li>
            </ul>
          </BodyText>
        </Section>
        <Section>
          <SectionTitle variant="h6">
            2. How Your Information is Used
          </SectionTitle>
          <BodyText>
            We use your data to:
            <ul>
              <li>Enable login and access to your account.</li>
              <li>Store and display your lessons and flashcards.</li>
              <li>Improve app functionality and user experience.</li>
              <li>Respond to support requests.</li>
            </ul>
            We do not sell your personal data to third parties.
          </BodyText>
        </Section>
        <Section>
          <SectionTitle variant="h6">3. Data Storage and Security</SectionTitle>
          <BodyText>
            All user data is stored securely on our backend servers. We use
            authentication and encryption to protect your data. Only authorized
            personnel have access to your information, and we take reasonable
            measures to ensure its safety.
          </BodyText>
        </Section>
        <Section>
          <SectionTitle variant="h6">4. Your Rights</SectionTitle>
          <BodyText>
            You have the right to:
            <ul>
              <li>Access the data we store about you.</li>
              <li>Request corrections to inaccurate data.</li>
              <li>Request deletion of your account and content.</li>
            </ul>
            To make a request, please contact us at:{" "}
            <strong>languageApp@gmail.com</strong>.
          </BodyText>
        </Section>
        <Section>
          <SectionTitle variant="h6">5. Changes to This Policy</SectionTitle>
          <BodyText>
            We may update this Privacy Policy from time to time. If significant
            changes are made, we will notify users in the app.
          </BodyText>
        </Section>
        <Section>
          <SectionTitle variant="h6">Contact Us</SectionTitle>
          <BodyText>
            If you have any questions about this Privacy Policy, please contact
            us at: <strong>languageApp@gmail.com</strong>.
          </BodyText>
        </Section>
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
