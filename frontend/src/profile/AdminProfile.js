import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Chip,
  Divider,
  Avatar,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAdminById, deleteMovie } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "transform 0.2s",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E0E0E0",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const adminId = localStorage.getItem("adminId");
      const token = localStorage.getItem("token");

      if (!adminId || !token) {
        throw new Error("Please login as admin first");
      }

      const res = await getAdminById();
      console.log("Admin data received:", res);

      if (res && res.admin) {
        setAdmin(res.admin);
      } else {
        throw new Error("Invalid admin data received");
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setMessage(err.message || "Failed to fetch admin data");
      setSeverity("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await deleteMovie(movieId);
      if (response) {
        setMessage("Movie deleted successfully!");
        setSeverity("success");
        setOpen(true);
        // Refresh admin data after successful deletion
        fetchAdminData();
      }
    } catch (err) {
      console.error("Error deleting movie:", err);
      setMessage("Failed to delete movie");
      setSeverity("error");
      setOpen(true);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4, backgroundColor: "#F7F7F7", minHeight: "100vh" }}
    >
      <Grid container spacing={4}>
        {/* Admin Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: "linear-gradient(135deg, #2D3047 0%, #419D78 100%)",
              color: "white",
              borderRadius: 2,
              height: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: "rgba(255,255,255,0.2)",
                  mb: 2,
                  border: "3px solid #E0A458",
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 100, color: "#FFFFFF" }} />
              </Avatar>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, color: "#FFFFFF" }}
              >
                Admin Dashboard
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, color: "#FFFFFF" }}
              >
                {admin?.email}
              </Typography>
              <Chip
                label={`${admin?.addedMovies?.length || 0} Movies Added`}
                sx={{
                  mt: 2,
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "1px solid #E0A458",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.3)",
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Movies Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: "#FFFFFF",
              borderRadius: 2,
              height: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#2D3047",
                mb: 3,
              }}
            >
              Added Movies
            </Typography>
            <Divider sx={{ mb: 3, backgroundColor: "#E0E0E0" }} />
            {!admin?.addedMovies || admin.addedMovies.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  bgcolor: "#F7F7F7",
                  borderRadius: 2,
                }}
              >
                <MovieIcon sx={{ fontSize: 60, color: "#419D78", mb: 2 }} />
                <Typography variant="h6" color="#2D3047">
                  No movies added yet
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {admin.addedMovies.map((movie) => (
                  <Grid item xs={12} key={movie._id}>
                    <StyledCard>
                      <Box display="flex" alignItems="center" flexGrow={1}>
                        <MovieIcon
                          sx={{ fontSize: 40, color: "#419D78", mr: 2 }}
                        />
                        <Box flexGrow={1}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ color: "#2D3047" }}
                          >
                            {movie.title}
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <CalendarTodayIcon
                              sx={{ mr: 1, color: "#419D78" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#666666" }}
                            >
                              Release Date:{" "}
                              {new Date(movie.releaseDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <IconButton
                        onClick={() => handleDeleteMovie(movie._id)}
                        sx={{
                          color: "#E0A458",
                          "&:hover": {
                            backgroundColor: "rgba(224, 164, 88, 0.1)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: "100%",
            backgroundColor: severity === "success" ? "#419D78" : "#E0A458",
            color: "#FFFFFF",
            "& .MuiAlert-icon": {
              color: "#FFFFFF",
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminProfile;
