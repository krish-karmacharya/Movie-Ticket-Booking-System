import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Alert,
  Fade,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useSelector } from "react-redux";
import { initiateKhaltiPayment } from "../../api-helpers/api-helpers";

const PaymentOption = styled(Card)(({ theme, selected }) => ({
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(1),
  cursor: "pointer",
  border: `1px solid ${selected ? theme.palette.primary.main : "#ccc"}`,
  backgroundColor: selected ? "rgba(25, 118, 210, 0.04)" : "white",
}));

const BookingSummaryCard = styled(Card)(({ theme }) => ({
  background: "#1e3c72",
  color: "white",
  height: "100%",
  borderRadius: theme.spacing(1),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
}));

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const booking = location.state?.booking;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [khaltiLoading, setKhaltiLoading] = useState(false);
  const [khaltiError, setKhaltiError] = useState("");

  if (!isUserLoggedIn || !booking) {
    navigate("/auth");
    return null;
  }

  const handlePayment = (method) => {
    setSelectedPaymentMethod(method);
    setKhaltiError("");
    if (method === "Pay on Arrival") {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/user");
      }, 3000);
    }
  };

  const handlePayWithKhalti = async (e) => {
    e?.stopPropagation?.();
    setKhaltiLoading(true);
    setKhaltiError("");
    try {
      const totalAmount = calculateTotalPrice(booking);
      const baseUrl = window.location.origin;
      const data = await initiateKhaltiPayment({
        amount: totalAmount,
        purchase_order_id: booking._id,
        purchase_order_name: booking.movie?.title || "Movie Ticket Booking",
        return_url: `${baseUrl}/payment/return`,
        website_url: `${baseUrl}/`,
        customer_info: booking.user
          ? {
              name: booking.user.name || "",
              email: booking.user.email || "",
              phone: "",
            }
          : undefined,
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err) {
      setKhaltiError(err.message || "Failed to initiate Khalti payment");
      setKhaltiLoading(false);
    }
  };

  const calculateTotalPrice = (booking) => {
    const normalSeatPrice = 350;
    const premiumSeatPrice = 750;
    const premiumSeats = [1, 2, 3, 4, 5, 26, 27, 28, 29, 30];

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
    <Box sx={{ p: 2 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 2 }}>
          {showSuccess && (
            <Fade in={showSuccess}>
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Booking Successful!</Typography>
                <Typography variant="body2">
                  Your booking has been confirmed. You will be redirected
                  shortly.
                </Typography>
              </Alert>
            </Fade>
          )}

          {!showSuccess && (
            <>
              <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                Complete Your Payment
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <BookingSummaryCard>
                    <CardContent sx={{ p: 1 }}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ mb: 1 }}
                      >
                        Booking Summary
                      </Typography>
                      <List dense sx={{ py: 0 }}>
                        <StyledListItem>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CreditCardIcon
                              sx={{ color: "white", fontSize: 16 }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Booking ID"
                            secondary={booking._id}
                            primaryTypographyProps={{
                              color: "white",
                              fontSize: "0.75rem",
                            }}
                            secondaryTypographyProps={{
                              color: "rgba(255,255,255,0.7)",
                              fontSize: "0.7rem",
                            }}
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <MovieIcon sx={{ color: "white", fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Movie"
                            secondary={booking.movie.title}
                            primaryTypographyProps={{
                              color: "white",
                              fontSize: "0.75rem",
                            }}
                            secondaryTypographyProps={{
                              color: "rgba(255,255,255,0.7)",
                              fontSize: "0.7rem",
                            }}
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CalendarTodayIcon
                              sx={{ color: "white", fontSize: 16 }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Date & Time"
                            secondary={new Date(booking.date).toLocaleString()}
                            primaryTypographyProps={{
                              color: "white",
                              fontSize: "0.75rem",
                            }}
                            secondaryTypographyProps={{
                              color: "rgba(255,255,255,0.7)",
                              fontSize: "0.7rem",
                            }}
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <EventSeatIcon
                              sx={{ color: "white", fontSize: 16 }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Seats"
                            secondary={
                              Array.isArray(booking.seats)
                                ? booking.seats
                                    .map((seat) =>
                                      typeof seat === "object"
                                        ? seat.number
                                        : seat
                                    )
                                    .join(", ")
                                : booking.seatNumber
                            }
                            primaryTypographyProps={{
                              color: "white",
                              fontSize: "0.75rem",
                            }}
                            secondaryTypographyProps={{
                              color: "rgba(255,255,255,0.7)",
                              fontSize: "0.7rem",
                            }}
                          />
                        </StyledListItem>
                      </List>
                      <Box
                        sx={{ mt: 1, p: 0.5, bgcolor: "rgba(255,255,255,0.1)" }}
                      >
                        <Typography
                          variant="subtitle2"
                          align="center"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          Total Amount
                        </Typography>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{ color: "#ffd700", fontSize: "1rem" }}
                        >
                          Rs. {calculateTotalPrice(booking).toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </BookingSummaryCard>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Select Payment Method
                      </Typography>
                      {khaltiError && (
                        <Alert severity="error" sx={{ mb: 1, py: 0.5 }}>
                          {khaltiError}
                        </Alert>
                      )}
                      <PaymentOption
                        onClick={() => handlePayment("Pay on Arrival")}
                        selected={selectedPaymentMethod === "Pay on Arrival"}
                      >
                        <LocalAtmIcon
                          sx={{ fontSize: 20, color: "#1e3c72", mb: 0.5 }}
                        />
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Pay on Arrival
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          Pay at the theater counter
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          size="small"
                          sx={{
                            bgcolor: "#1e3c72",
                            py: 0.25,
                            px: 1,
                            fontSize: "0.7rem",
                            minHeight: "24px",
                          }}
                        >
                          Select & Continue
                        </Button>
                      </PaymentOption>

                      <PaymentOption
                        onClick={() => handlePayment("Khalti")}
                        selected={selectedPaymentMethod === "Khalti"}
                        sx={{ mt: 1 }}
                      >
                        <AccountBalanceWalletIcon
                          sx={{ fontSize: 24, color: "#773292", mb: 0.5 }}
                        />
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Khalti
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          Pay instantly with Khalti wallet
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          size="small"
                          disabled={khaltiLoading}
                          onClick={handlePayWithKhalti}
                          sx={{
                            bgcolor: "#773292",
                            py: 0.25,
                            px: 1,
                            fontSize: "0.7rem",
                            minHeight: "24px",
                            "&:hover": { bgcolor: "#5a2370" },
                          }}
                        >
                          {khaltiLoading ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            "Pay with Khalti"
                          )}
                        </Button>
                      </PaymentOption>
                    </Box>

                    <Box sx={{ p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Important Instructions
                      </Typography>
                      <List dense sx={{ py: 0 }}>
                        {[
                          "Present booking confirmation at counter",
                          "Pay at counter to receive tickets",
                          "Arrive 30 minutes before show",
                        ].map((text, index) => (
                          <ListItem key={index} sx={{ py: 0.25 }}>
                            <ListItemText
                              primary={`${index + 1}. ${text}`}
                              primaryTypographyProps={{ fontSize: "0.75rem" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentPage;
