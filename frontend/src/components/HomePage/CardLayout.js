import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(() => ({
  width: 250,
  height: 280,
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
}));

const CardLayout = ({ title, description, releaseDate, posterUrl, id }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  return (
    <StyledCard>
      <Box
        sx={{
          height: "45%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          height="100%"
          width="100%"
          src={posterUrl}
          alt={title}
          style={{
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#1a237e",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={handleBooking}
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#1a237e",
            color: "white",
            borderRadius: "20px",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#000051",
              transform: "scale(1.02)",
            },
            transition: "all 0.3s ease",
            py: 1,
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CardLayout;
