import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          All Movies
        </Typography>
      </Paper>

      {movies.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No movies available.
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {movies.map((movie, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
                height: "100%",
              }}
            >
              <MovieItem
                id={movie._id}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                title={movie.title}
                description={movie.description}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Movies;
