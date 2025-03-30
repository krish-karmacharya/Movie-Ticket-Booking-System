import { Box, Button, Typography, Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";
import { styled } from "@mui/material/styles";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  height: "100%",
  background: "transparent",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: "#1a237e",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  color: "white",
  boxShadow: "0 4px 20px rgba(26, 35, 126, 0.2)",
  "& svg": {
    fontSize: 40,
  },
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: "#000051",
  },
}));

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));

    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "85vh",
          width: "100%",
          overflow: "hidden",
          mb: 10,
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.5)",
            transform: "scale(1.1)",
            transition: "transform 0.5s ease-in-out",
            "&:hover": {
              transform: "scale(1.15)",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            p: 4,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 4,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              letterSpacing: "2px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-in-out",
            }}
          >
            Welcome to MovieHub
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              maxWidth: "800px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
              lineHeight: 1.8,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-in-out 0.2s",
            }}
          >
            Experience the magic of cinema with our seamless booking platform.
            Discover the latest blockbusters and timeless classics.
          </Typography>
          <Button
            component={Link}
            to="/movies"
            variant="contained"
            size="large"
            startIcon={<MovieIcon />}
            sx={{
              bgcolor: "#1a237e",
              color: "white",
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              borderRadius: "30px",
              boxShadow: "0 4px 20px rgba(26, 35, 126, 0.3)",
              "&:hover": {
                bgcolor: "#000051",
                transform: "scale(1.05)",
                boxShadow: "0 6px 25px rgba(26, 35, 126, 0.4)",
              },
              transition: "all 0.3s ease",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Explore Movies
          </Button>
        </Box>
      </Box>

      {/* Latest Releases Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 8,
            fontWeight: 700,
            color: "#1a237e",
            position: "relative",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-in-out 0.4s",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              height: "4px",
              bgcolor: "#1a237e",
              borderRadius: "2px",
            },
          }}
        >
          Latest Releases
        </Typography>

        <Grid container spacing={4} sx={{ mb: 12 }}>
          {movies &&
            movies.slice(0, 4).map((movie, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease-in-out ${0.6 + index * 0.1}s`,
                  }}
                >
                  <MovieItem
                    id={movie._id}
                    title={movie.title}
                    posterUrl={movie.posterUrl}
                    releaseDate={movie.releaseDate}
                    description={movie.description}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>

        {/* Features Section */}
        <Box
          sx={{
            py: 10,
            px: 6,
            bgcolor: "#f8f9fa",
            borderRadius: 4,
            mb: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-in-out 1s",
          }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={0}>
                <FeatureIcon>
                  <MovieIcon />
                </FeatureIcon>
                <Typography
                  variant="h5"
                  sx={{ mb: 3, fontWeight: 600, color: "#1a237e" }}
                >
                  Extensive Collection
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Access a vast library of movies from various genres and eras
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={0}>
                <FeatureIcon>
                  <LocalMoviesIcon />
                </FeatureIcon>
                <Typography
                  variant="h5"
                  sx={{ mb: 3, fontWeight: 600, color: "#1a237e" }}
                >
                  Latest Releases
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Stay updated with the newest blockbusters and trending movies
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={0}>
                <FeatureIcon>
                  <ConfirmationNumberIcon />
                </FeatureIcon>
                <Typography
                  variant="h5"
                  sx={{ mb: 3, fontWeight: 600, color: "#1a237e" }}
                >
                  Easy Booking
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Book your tickets in just a few clicks with our user-friendly
                  interface
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
