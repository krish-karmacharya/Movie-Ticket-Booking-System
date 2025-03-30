import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/material/styles";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a237e",
  color: "#FFFFFF",
  padding: theme.spacing(6, 0),
  marginTop: "auto",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #1a237e, #0d47a1)",
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#FFFFFF",
  textDecoration: "none",
  opacity: 0.8,
  transition: "all 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "&:hover": {
    opacity: 1,
    color: "#FFFFFF",
    transform: "translateX(5px)",
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  opacity: 0.8,
  transition: "opacity 0.3s ease-in-out",
  "&:hover": {
    opacity: 1,
  },
}));

const FooterSection = ({ title, links, children }) => (
  <Box>
    <Typography
      variant="h6"
      sx={{
        mb: 2,
        fontWeight: 600,
        color: "#FFFFFF",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-8px",
          left: 0,
          width: "40px",
          height: "2px",
          backgroundColor: "#FFFFFF",
          opacity: 0.5,
        },
      }}
    >
      {title}
    </Typography>
    {links ? (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {links.map((link, index) => (
          <FooterLink key={index} component={RouterLink} to={link.path}>
            {link.icon}
            {link.text}
          </FooterLink>
        ))}
      </Box>
    ) : (
      children
    )}
  </Box>
);

const Footer = () => {
  const footerSections = [
    {
      title: "Movies",
      links: [
        {
          text: "Latest Releases",
          path: "/movies",
          icon: <MovieIcon sx={{ fontSize: 20 }} />,
        },
        {
          text: "Coming Soon",
          path: "/movies",
          icon: <LocalMoviesIcon sx={{ fontSize: 20 }} />,
        },
        {
          text: "Book Tickets",
          path: "/movies",
          icon: <ConfirmationNumberIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          text: "Contact Us",
          path: "/contact",
          icon: <SupportAgentIcon sx={{ fontSize: 20 }} />,
        },
        {
          text: "FAQ",
          path: "/faq",
          icon: <SupportAgentIcon sx={{ fontSize: 20 }} />,
        },
        {
          text: "Terms & Conditions",
          path: "/terms",
          icon: <SupportAgentIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
    {
      title: "Contact Info",
      children: (
        <>
          <ContactInfo>
            <EmailIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2">support@moviehub.com</Typography>
          </ContactInfo>
          <ContactInfo>
            <PhoneIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2">+977 9761625360</Typography>
          </ContactInfo>
          <ContactInfo>
            <LocationOnIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2">
              123 Movie Street, Cinema City
            </Typography>
          </ContactInfo>
        </>
      ),
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, tooltip: "Follow us on Facebook" },
    { icon: <TwitterIcon />, tooltip: "Follow us on Twitter" },
    { icon: <InstagramIcon />, tooltip: "Follow us on Instagram" },
    { icon: <YouTubeIcon />, tooltip: "Subscribe on YouTube" },
  ];

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FooterSection title={section.title} links={section.links}>
                {section.children}
              </FooterSection>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} MovieHub. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {socialLinks.map((social, index) => (
              <Tooltip key={index} title={social.tooltip}>
                <IconButton
                  sx={{
                    color: "#FFFFFF",
                    opacity: 0.8,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      opacity: 1,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
