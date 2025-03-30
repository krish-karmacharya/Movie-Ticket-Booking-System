import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

const StyledFooter = styled("footer")(({ theme }) => ({
  background: "#2C1810",
  color: "#E6D5C7",
  padding: theme.spacing(6, 0),
  marginTop: "auto",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#E6D5C7",
  textDecoration: "none",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#C4A484",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#E6D5C7",
  "&:hover": {
    color: "#C4A484",
    backgroundColor: "rgba(196, 164, 132, 0.1)",
  },
}));
