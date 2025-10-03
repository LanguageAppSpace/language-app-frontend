import {
  Box,
  Card,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import StorageIcon from "@mui/icons-material/Storage";
import BugReportIcon from "@mui/icons-material/BugReport";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SchoolIcon from "@mui/icons-material/School";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import {
  Tile,
  TileDescription,
  TileIcon,
  TileName,
} from "@/components/Tile/Tile";

const POLSKIE_PROGRAMISTKI_LINK = "https://polskieprogramistki.pl/";
const DISCORD_INVITE = "https://discord.com/invite/56K84HzUgd";

type IconComp = typeof CodeIcon;

const team: { name: string; role: string; icon: IconComp }[] = [
  { name: "aryla", role: "Project Manager / QA", icon: BugReportIcon },
  { name: "magdalena", role: "Frontend Developer", icon: CodeIcon },
  { name: "pescarynka", role: "Backend Developer", icon: StorageIcon },
  { name: "anusianne", role: "Frontend Developer", icon: CodeIcon },
  { name: "olcolcolc", role: "Frontend Developer", icon: DesignServicesIcon },
];

const values = [
  {
    title: "Community over ego",
    desc: "We build together. We share knowledge, pair-program, and learn by shipping real features.",
    icon: GroupWorkIcon,
  },
  {
    title: "Kindness & accessibility",
    desc: "Friendly UX and zero gatekeeping - in language learning and in tech. Everyone is welcome.",
    icon: FavoriteIcon,
  },
  {
    title: "Learning by doing",
    desc: "From idea to deployment: code reviews, testing, CI/CD, and continuous improvement.",
    icon: SchoolIcon,
  },
  {
    title: "Equality & support",
    desc: "We uplift women in tech. Every path and pace is valid, curiosity is celebrated.",
    icon: Diversity3Icon,
  },
];

export default function AboutUs() {
  return (
    <>
      <Hero>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <StyledChip label="About us" />
              <HeroTitle variant="h3">
                Built by the <em>Polskie Programistki</em> community
              </HeroTitle>

              <HeroSub variant="h6">
                We're a group of women from the{" "}
                <strong>Polskie Programistki</strong> Discord server who teamed
                up to create a friendly, modern platform for learning languages
                and to show that there's room for everyone in tech.
              </HeroSub>

              <ButtonRow>
                <PrimaryButton
                  target="_blank"
                  rel="noopener noreferrer"
                  href={DISCORD_INVITE}
                >
                  Join our Discord
                </PrimaryButton>
                <OutlineButton href={POLSKIE_PROGRAMISTKI_LINK} target="_blank">
                  Website
                </OutlineButton>
              </ButtonRow>
            </Grid>

            <Grid item xs={12} md={5}>
              <HeroImage
                src="/girls.jpg"
                alt="Women collaborating"
                loading="lazy"
              />
            </Grid>
          </Grid>
        </Container>
      </Hero>

      <Section>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h4" fontWeight={800} gutterBottom>
                Our mission
              </SectionTitle>
              <BodyText>
                We combine language education with our love for technology. This
                is a community-driven project designed to help learners gain
                confidence in new languages while empowering more women to
                explore and enter the IT field. By blending real product work
                with mentorship and peer support, we grow together.
              </BodyText>
            </Grid>

            <Grid item xs={12} md={6}>
              <ValuesCard>
                <CardSectionLabel variant="subtitle2">
                  What guides us:
                </CardSectionLabel>
                <Grid container>
                  {values.map((v) => {
                    const Icon = v.icon;
                    return (
                      <Grid key={v.title} item xs={12} sm={6}>
                        <ValueCard tabIndex={0}>
                          <ValueIconWrap>
                            <Icon fontSize="small" />
                          </ValueIconWrap>
                          <ValueTitle>{v.title}</ValueTitle>
                          <ValueDesc variant="body2">{v.desc}</ValueDesc>
                        </ValueCard>
                      </Grid>
                    );
                  })}
                </Grid>
              </ValuesCard>
            </Grid>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <SectionTitle variant="h4">Meet the team</SectionTitle>
          <BodyText>
            A handful of us lead the work, and many contributors from the
            community jump in with code, design, testing, and ideas.
          </BodyText>

          <Grid container spacing={3}>
            {team.map((m) => {
              const Icon = m.icon;
              return (
                <Grid key={m.name} item xs={12} sm={6} md={4}>
                  <Tile>
                    <TileIcon>
                      <Icon fontSize="inherit" />
                    </TileIcon>
                    <TileName variant="h6">{m.name}</TileName>
                    <TileDescription variant="body2">{m.role}</TileDescription>
                  </Tile>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Section>

      <CTA>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={8}>
              <CTAHeading variant="h5">
                Want to learn, build, or mentor?
              </CTAHeading>
              <CTAText>
                Whether you're new to coding, passionate about languages, or
                ready to mentor - you're invited. Come shape a helpful,
                inclusive learning app with us.
              </CTAText>
            </Grid>
            <Grid item xs={12} md={4}>
              <CTAButtonContainer>
                <PrimaryButton target="_blank" href={DISCORD_INVITE}>
                  Join our Discord
                </PrimaryButton>
              </CTAButtonContainer>
            </Grid>
          </Grid>
        </Container>
      </CTA>
    </>
  );
}

const Hero = styled("section")(({ theme }) => ({
  padding: theme.spacing(20, 6),
  background: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(10, 2),
  },
}));

const HeroImage = styled("img")(() => ({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  display: "block",
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  backgroundColor: theme.palette.button.dark,
  color: theme.palette.text.primary,
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  paddingBottom: theme.spacing(2),
  fontWeight: 800,
  [theme.breakpoints.down("md")]: {
    fontSize: 32,
  },
}));

const HeroSub = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const ButtonRow = styled(Stack)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const PrimaryButton = styled("a")(({ theme }) => ({
  borderRadius: 16,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${theme.spacing(1.2)} ${theme.spacing(3)}`,
  backgroundColor: theme.palette.button.dark,
  color: theme.palette.text.primary,
  textDecoration: "none",
  "&:hover": { backgroundColor: theme.palette.button.hover },
  "&:focus-visible": {
    outline: `3px solid ${theme.palette.button.main}`,
    outlineOffset: 2,
  },
}));

const OutlineButton = styled("a")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 16,
  textDecoration: "none",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  border: `1px solid ${theme.palette.secondary.light}`,
  color: theme.palette.secondary.light,
  transition:
    "color .2s ease, border-color .2s ease, background-color .2s ease",
  "&:hover": {
    borderColor: theme.palette.button.main,
    color: theme.palette.button.main,
    backgroundColor: theme.palette.action.hover,
  },
  "&:focus-visible": {
    outline: `3px solid ${theme.palette.button.main}`,
    outlineOffset: 2,
  },
}));

const Section = styled("section")(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const BodyText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

const ValuesCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1),
}));

const CardSectionLabel = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  paddingBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const ValueCard = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 10,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  transition:
    "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-3px)",
    borderColor: theme.palette.secondary.main,
  },
}));

const ValueIconWrap = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "50%",
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.background.light,
  color: theme.palette.secondary.main,
}));

const ValueTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.secondary,
}));

const ValueDesc = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const CTA = styled("section")(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.secondary.main,
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(5, 0),
  },
}));

const CTAHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 800,
  marginBottom: 8,
}));

const CTAText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const CTAButtonContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));
