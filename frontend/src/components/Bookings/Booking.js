import {
  Button,
  FormLabel,
  TextField,
  Typography,
  Paper,
  Container,
  Grid,
  Snackbar,
  Alert,
  Box,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { styled } from "@mui/material/styles";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useSelector } from "react-redux";
import axios from "axios";

const StyledSeat = styled(ToggleButton)(({ theme, isPremium }) => ({
  margin: 4,
  padding: 8,
  borderRadius: 8,
  position: "relative",
  backgroundColor: isPremium ? "#ffd700" : "#4CAF50",
  color: isPremium ? "#000" : "white",
  "&.Mui-selected": {
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  "&.booked": {
    backgroundColor: "#ff4444",
    color: "white",
    cursor: "not-allowed",
    "&:hover": {
      backgroundColor: "#ff4444",
    },
  },
  "&:hover": {
    backgroundColor: isPremium ? "#fff3cd" : "#45a049",
  },
}));

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seats: [], date: "" });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();
  const id = useParams().id;
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Get movie release date in YYYY-MM-DD format
  const movieReleaseDate = movie
    ? new Date(movie.releaseDate).toISOString().split("T")[0]
    : null;

  // Generate seats array (total 35 seats - 5x7)
  const totalSeats = 35;

  // Update base prices
  const normalSeatPrice = 350;
  const premiumSeatPrice = 750;
  // First two rows (14 seats) are premium
  const premiumSeats = Array.from({ length: 14 }, (_, i) => i + 1);

  // Function to calculate total price
  const calculateTotalPrice = (selectedSeats) => {
    return selectedSeats.reduce((total, seatNumber) => {
      return (
        total +
        (premiumSeats.includes(seatNumber) ? premiumSeatPrice : normalSeatPrice)
      );
    }, 0);
  };

  // Function to fetch booked seats for a specific date
  const fetchBookedSeats = async (date) => {
    try {
      const response = await axios.get(`/booking/booked-seats/${id}`, {
        params: { date },
      });
      setBookedSeats(response.data.bookedSeats);
    } catch (err) {
      console.error("Error fetching booked seats:", err);
      setError("Failed to fetch booked seats");
      setOpen(true);
    }
  };

  // Update handleChange to fetch booked seats when date changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate date
    if (name === "date") {
      // Check if date is before today
      if (value < today) {
        setError("Cannot book for past dates");
        setOpen(true);
        return;
      }

      // Check if date is before movie release date
      if (movieReleaseDate && value < movieReleaseDate) {
        setError("Cannot book before movie release date");
        setOpen(true);
        return;
      }

      // Fetch booked seats for the selected date
      fetchBookedSeats(value);
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Update handleSeatSelect to prevent selecting booked seats
  const handleSeatSelect = (seatNumber) => {
    // If seat is already booked, prevent selection
    if (bookedSeats.includes(seatNumber)) {
      setError("This seat is already booked");
      setOpen(true);
      return;
    }

    setInputs((prev) => {
      const currentSeats = [...prev.seats];
      const seatIndex = currentSeats.indexOf(seatNumber);

      if (seatIndex === -1) {
        // Add seat if not already selected
        currentSeats.push(seatNumber);
      } else {
        // Remove seat if already selected
        currentSeats.splice(seatIndex, 1);
      }

      return {
        ...prev,
        seats: currentSeats,
      };
    });
  };

  useEffect(() => {
    // Check if user is logged in
    if (!isUserLoggedIn) {
      setError("Please log in to book tickets");
      setOpen(true);
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
      return;
    }

    // Check if userId exists in localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Session expired. Please log in again");
      setOpen(true);
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
      return;
    }

    getMovieDetails(id)
      .then((res) => {
        if (!res || !res.movie) {
          throw new Error("Movie not found");
        }
        setMovie(res.movie);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch movie details");
        setOpen(true);
      });
  }, [id, isUserLoggedIn, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUserLoggedIn) {
      navigate("/auth");
      return;
    }

    if (!inputs.date || inputs.seats.length === 0) {
      setError("Please select a date and at least one seat");
      setOpen(true);
      return;
    }

    try {
      const response = await newBooking({
        movie: id,
        date: inputs.date,
        seats: inputs.seats,
      });

      if (response.booking) {
        navigate("/payment", { state: { booking: response.booking } });
      }
    } catch (err) {
      setError(err.message || "Failed to create booking");
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {movie && (
        <Fragment>
          <Typography
            variant="h3"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#1a237e",
              mb: 4,
            }}
          >
            Book Tickets for {movie.title}
          </Typography>

          <Grid container spacing={4}>
            {/* Movie Details Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                <Box
                  component="img"
                  src={movie.posterUrl}
                  alt={movie.title}
                  sx={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: 1,
                    mb: 3,
                  }}
                />
                <Typography variant="body1" paragraph>
                  {movie.description}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Starring: {movie.actors.join(", ")}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Release Date:{" "}
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
              </Paper>
            </Grid>

            {/* Booking Form Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#1a237e" }}
                  >
                    Book Your Tickets
                  </Typography>

                  {/* Date Selection First */}
                  <Box sx={{ mb: 4 }}>
                    <FormLabel>Select Date</FormLabel>
                    <TextField
                      fullWidth
                      type="date"
                      name="date"
                      value={inputs.date}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: today,
                      }}
                      sx={{ mb: 2 }}
                    />
                    {!inputs.date && (
                      <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                        Please select a date to choose your seats
                      </Typography>
                    )}
                  </Box>

                  {inputs.date && (
                    <>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "#1a237e" }}
                      >
                        Select Your Seats
                      </Typography>

                      {/* Screen Representation */}
                      <Box
                        sx={{
                          width: "100%",
                          position: "relative",
                          marginBottom: "50px",
                          paddingTop: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            margin: "0 auto",
                            height: "20px",
                            background:
                              "linear-gradient(to bottom, #2196f3, #64b5f6)",
                            borderTopLeftRadius: "50% 100%",
                            borderTopRightRadius: "50% 100%",
                            transform: "perspective(200px) rotateX(40deg)",
                            opacity: 0.8,
                            boxShadow: "0 -6px 20px rgba(33, 150, 243, 0.4)",
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: "10%",
                              right: "10%",
                              height: "100%",
                              background:
                                "linear-gradient(to bottom, #1976d2, #42a5f5)",
                              borderTopLeftRadius: "50% 100%",
                              borderTopRightRadius: "50% 100%",
                              filter: "blur(4px)",
                            },
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#90caf9",
                            textAlign: "center",
                            marginTop: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                          }}
                        >
                          Screen
                        </Typography>
                      </Box>

                      {/* Seats Grid */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          mb: 3,
                          position: "relative",
                          justifyContent: "center",
                          maxWidth: "600px",
                          margin: "0 auto",
                        }}
                      >
                        {Array.from({ length: 5 }, (_, rowIndex) => (
                          <Box
                            key={rowIndex}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              mb: 1,
                            }}
                          >
                            {Array.from({ length: 7 }, (_, colIndex) => {
                              const seatNumber = rowIndex * 7 + colIndex + 1;
                              return (
                                <Tooltip
                                  key={seatNumber}
                                  title={
                                    bookedSeats.includes(seatNumber)
                                      ? "Already Booked"
                                      : inputs.seats.includes(seatNumber)
                                      ? `Selected - ${
                                          premiumSeats.includes(seatNumber)
                                            ? "Premium (Rs. 750)"
                                            : "Normal (Rs. 350)"
                                        }`
                                      : `Seat ${seatNumber} - ${
                                          premiumSeats.includes(seatNumber)
                                            ? "Premium (Rs. 750)"
                                            : "Normal (Rs. 350)"
                                        }`
                                  }
                                >
                                  <StyledSeat
                                    value={seatNumber}
                                    selected={inputs.seats.includes(seatNumber)}
                                    onClick={() => handleSeatSelect(seatNumber)}
                                    className={
                                      bookedSeats.includes(seatNumber)
                                        ? "booked"
                                        : ""
                                    }
                                    isPremium={premiumSeats.includes(
                                      seatNumber
                                    )}
                                    disabled={bookedSeats.includes(seatNumber)}
                                    sx={{
                                      width: "40px",
                                      height: "40px",
                                      margin: "4px",
                                    }}
                                  >
                                    <EventSeatIcon />
                                  </StyledSeat>
                                </Tooltip>
                              );
                            })}
                          </Box>
                        ))}
                      </Box>

                      {/* Seat Legend */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mb: 3,
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <StyledSeat disabled isPremium>
                            <EventSeatIcon />
                          </StyledSeat>
                          <Typography variant="body2" sx={{ color: "#ffd700" }}>
                            Premium (Rs. 750)
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <StyledSeat disabled>
                            <EventSeatIcon />
                          </StyledSeat>
                          <Typography variant="body2" sx={{ color: "#4CAF50" }}>
                            Normal (Rs. 350)
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <StyledSeat disabled className="booked">
                            <EventSeatIcon />
                          </StyledSeat>
                          <Typography variant="body2" sx={{ color: "#ff4444" }}>
                            Booked
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="subtitle1" gutterBottom>
                        Selected Seats:{" "}
                        {inputs.seats.length > 0
                          ? inputs.seats.join(", ")
                          : "None"}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Total Price: Rs.{" "}
                        {calculateTotalPrice(inputs.seats).toFixed(2)}
                      </Typography>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: "#1a237e",
                          "&:hover": {
                            bgcolor: "#000051",
                          },
                        }}
                      >
                        Book Now
                      </Button>
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Fragment>
      )}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "Booking successful! Redirecting..."}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Booking;
