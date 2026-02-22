import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Stack,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TitleIcon from "@mui/icons-material/Title";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useEffect, useMemo, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const SORT_BY_TITLE = "title";
const SORT_BY_DATE = "releaseDate";
const SORT_ASC = "asc";
const SORT_DESC = "desc";

const sortMovies = (movies, sortBy, order) => {
  return [...movies].sort((a, b) => {
    let comparison = 0;
    if (sortBy === SORT_BY_TITLE) {
      const titleA = (a.title || "").toLowerCase();
      const titleB = (b.title || "").toLowerCase();
      comparison = titleA.localeCompare(titleB);
    } else {
      const dateA = new Date(a.releaseDate || 0).getTime();
      const dateB = new Date(b.releaseDate || 0).getTime();
      comparison = dateA - dateB;
    }
    return order === SORT_ASC ? comparison : -comparison;
  });
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState(SORT_BY_TITLE);
  const [sortOrder, setSortOrder] = useState(SORT_ASC);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const sortedMovies = useMemo(
    () => sortMovies(movies, sortBy, sortOrder),
    [movies, sortBy, sortOrder]
  );

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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <Chip
            icon={<SortIcon />}
            label="Sort"
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "white",
              fontWeight: 600,
              "& .MuiChip-icon": { color: "white" },
            }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={sortBy}
              exclusive
              onChange={(_, val) => val && setSortBy(val)}
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  color: "rgba(255,255,255,0.9)",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.25)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  },
                },
              }}
            >
              <ToggleButton value={SORT_BY_TITLE} aria-label="sort by title">
                <TitleIcon sx={{ mr: 0.5, fontSize: 18 }} />
                Title
              </ToggleButton>
              <ToggleButton value={SORT_BY_DATE} aria-label="sort by date">
                <CalendarMonthIcon sx={{ mr: 0.5, fontSize: 18 }} />
                Release Date
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={sortOrder}
              exclusive
              onChange={(_, val) => val && setSortOrder(val)}
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  color: "rgba(255,255,255,0.9)",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.25)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  },
                },
              }}
            >
              <ToggleButton value={SORT_ASC} aria-label="ascending">
                <ArrowUpwardIcon sx={{ mr: 0.5, fontSize: 18 }} />
                Asc
              </ToggleButton>
              <ToggleButton value={SORT_DESC} aria-label="descending">
                <ArrowDownwardIcon sx={{ mr: 0.5, fontSize: 18 }} />
                Desc
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
      </Paper>

      {sortedMovies.length === 0 ? (
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
          {sortedMovies.map((movie, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={movie._id}
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
