import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useSelector } from "react-redux";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    "& .movie-image": {
      transform: "scale(1.05)",
    },
  },
}));

const MovieItem = ({ id, title, posterUrl, releaseDate, description }) => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleBooking = () => {
    if (!isUserLoggedIn) {
      navigate("/auth");
      return;
    }
    navigate(`/booking/${id}`);
  };

  return (
    <StyledCard>
      <Box
        sx={{
          position: "relative",
          paddingTop: "150%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={posterUrl}
          alt={title}
          className="movie-image"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <PlayCircleOutlineIcon sx={{ fontSize: 60, color: "white" }} />
        </Box>
      </Box>

      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: "#1a237e",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.3,
            height: "2.6em",
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <CalendarTodayIcon
            sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
          />
          <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.5,
            height: "3em",
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          onClick={handleBooking}
          variant="contained"
          fullWidth
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

export default MovieItem;
