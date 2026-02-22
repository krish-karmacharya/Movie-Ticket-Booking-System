import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

const StatusChip = ({ status, onClick, sx }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      color={getStatusColor(status)}
      size="small"
      sx={{ ml: 1, ...sx }}
      onClick={onClick}
    />
  );
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/auth", { replace: true });
      return;
    }

    getUserBooking()
      .then((res) => {
        if (!res || !res.bookings) {
          setMessage("Failed to fetch bookings");
          setSeverity("error");
          setOpen(true);
          setBookings([]);
          return;
        }
        setBookings(res.bookings);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed to fetch bookings");
        setSeverity("error");
        setOpen(true);
      });

    getUserDetails()
      .then((res) => {
        if (!res || !res.user) {
          setMessage("Failed to fetch user details");
          setSeverity("error");
          setOpen(true);
          setUser(null);
          return;
        }
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed to fetch user details");
        setSeverity("error");
        setOpen(true);
      });
  }, [navigate]);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        setBookings(bookings.filter((booking) => booking._id !== id));
        setMessage("Booking deleted successfully");
        setSeverity("success");
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed to delete booking");
        setSeverity("error");
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusClick = (booking) => {
    if (booking.status === "pending") {
      navigate("/payment", { state: { booking } });
    }
  };

  const getSeatDisplay = (booking) => {
    if (booking.seats && Array.isArray(booking.seats)) {
      // New data structure with multiple seats
      return booking.seats.map((seat) => seat.number).join(", ");
    } else if (booking.seatNumber) {
      // Old data structure with single seat
      return booking.seatNumber;
    }
    return "N/A";
  };

  const getPriceDisplay = (booking) => {
    const normalSeatPrice = 350;
    const premiumSeatPrice = 750;
    const premiumSeats = [1, 2, 3, 4, 5, 26, 27, 28, 29, 30];

    // Handle both old and new seat data structure
    const seats = Array.isArray(booking.seats)
      ? booking.seats
      : [booking.seatNumber];

    return seats.reduce((total, seat) => {
      const seatNumber = typeof seat === "object" ? seat.number : seat;
      return (
        total +
        (premiumSeats.includes(seatNumber) ? premiumSeatPrice : normalSeatPrice)
      );
    }, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* User Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
              color: "white",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: "rgba(255,255,255,0.2)",
                  mb: 2,
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 100 }} />
              </Avatar>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {user?.name}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                {user?.email}
              </Typography>
              <Chip
                label={`${bookings.length} Bookings`}
                sx={{
                  mt: 2,
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.3)",
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Bookings Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              My Bookings
            </Typography>
            {bookings.length === 0 ? (
              <Typography variant="body1" color="text.secondary" align="center">
                No bookings found
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {bookings.map((booking) => (
                  <Grid item xs={12} key={booking._id}>
                    <StyledCard>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Box display="flex" alignItems="center">
                              <Typography variant="h6" gutterBottom>
                                {booking.movie?.title}
                              </Typography>
                              <StatusChip
                                status={booking.status || "pending"}
                                onClick={() => handleStatusClick(booking)}
                                sx={{ cursor: "pointer" }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              <EventSeatIcon
                                sx={{
                                  fontSize: 16,
                                  mr: 0.5,
                                  verticalAlign: "middle",
                                }}
                              />
                              Seats: {getSeatDisplay(booking)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <CalendarTodayIcon
                                sx={{
                                  fontSize: 16,
                                  mr: 0.5,
                                  verticalAlign: "middle",
                                }}
                              />
                              Date:{" "}
                              {new Date(booking.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <MovieIcon
                                sx={{
                                  fontSize: 16,
                                  mr: 0.5,
                                  verticalAlign: "middle",
                                }}
                              />
                              Price: Rs. {getPriceDisplay(booking).toFixed(2)}
                            </Typography>
                          </Box>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(booking._id)}
                            sx={{
                              "&:hover": {
                                backgroundColor: "rgba(211, 47, 47, 0.1)",
                              },
                            }}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
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
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
