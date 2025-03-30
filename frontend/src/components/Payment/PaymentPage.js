import React from "react";
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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useSelector } from "react-redux";

const PaymentOption = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.3s ease",
  border: "1px solid transparent",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderColor: theme.palette.primary.main,
  },
}));

const BookingSummaryCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
  color: "white",
  marginBottom: theme.spacing(2),
}));

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const booking = location.state?.booking;

  if (!isUserLoggedIn || !booking) {
    navigate("/auth");
    return null;
  }

  const handlePayment = (method) => {
    // Here you would integrate with actual payment gateways
    console.log(`Processing payment with ${method}`);
    // For demo purposes, just show a success message
    alert(`Payment with ${method} would be processed here`);
  };

  const calculateTotalPrice = (booking) => {
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
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#1a237e", fontWeight: 600, mb: 2 }}
        >
          Payment Details
        </Typography>

        {/* Booking Summary */}
        <BookingSummaryCard>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Booking Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <MovieIcon sx={{ color: "white", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Movie"
                      secondary={booking.movie.title}
                      primaryTypographyProps={{
                        color: "white",
                        fontSize: "0.9rem",
                      }}
                      secondaryTypographyProps={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.8rem",
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon
                        sx={{ color: "white", fontSize: 20 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Date"
                      secondary={new Date(booking.date).toLocaleDateString()}
                      primaryTypographyProps={{
                        color: "white",
                        fontSize: "0.9rem",
                      }}
                      secondaryTypographyProps={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.8rem",
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EventSeatIcon sx={{ color: "white", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Seats"
                      secondary={
                        Array.isArray(booking.seats)
                          ? booking.seats
                              .map((seat) =>
                                typeof seat === "object" ? seat.number : seat
                              )
                              .join(", ")
                          : booking.seatNumber
                      }
                      primaryTypographyProps={{
                        color: "white",
                        fontSize: "0.9rem",
                      }}
                      secondaryTypographyProps={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.8rem",
                      }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: 600, mb: 1 }}
                  >
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "#ffd700", fontWeight: 700 }}
                  >
                    Rs. {calculateTotalPrice(booking).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </BookingSummaryCard>

        {/* Payment Options */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#1a237e", fontWeight: 600, mb: 2 }}
        >
          Select Payment Method
        </Typography>
        <Grid container spacing={2}>
          {/* Bank Transfer */}
          <Grid item xs={12} md={3}>
            <PaymentOption onClick={() => handlePayment("Bank Transfer")}>
              <AccountBalanceIcon
                sx={{ fontSize: 32, color: "#1a237e", mb: 1 }}
              />
              <Typography variant="subtitle1" gutterBottom>
                Bank Transfer
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ fontSize: "0.75rem" }}
              >
                Pay directly from your bank account
              </Typography>
            </PaymentOption>
          </Grid>

          {/* Credit Card */}
          <Grid item xs={12} md={3}>
            <PaymentOption onClick={() => handlePayment("Credit Card")}>
              <CreditCardIcon sx={{ fontSize: 32, color: "#1a237e", mb: 1 }} />
              <Typography variant="subtitle1" gutterBottom>
                Credit Card
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ fontSize: "0.75rem" }}
              >
                Pay with your credit or debit card
              </Typography>
            </PaymentOption>
          </Grid>

          {/* Mobile Payment */}
          <Grid item xs={12} md={3}>
            <PaymentOption onClick={() => handlePayment("Mobile Payment")}>
              <PhoneIphoneIcon sx={{ fontSize: 32, color: "#1a237e", mb: 1 }} />
              <Typography variant="subtitle1" gutterBottom>
                Mobile Payment
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ fontSize: "0.75rem" }}
              >
                Pay with eSewa, Khalti, or IME Pay
              </Typography>
            </PaymentOption>
          </Grid>

          {/* Pay on Arrival */}
          <Grid item xs={12} md={3}>
            <PaymentOption onClick={() => handlePayment("Pay on Arrival")}>
              <LocalAtmIcon sx={{ fontSize: 32, color: "#1a237e", mb: 1 }} />
              <Typography variant="subtitle1" gutterBottom>
                Pay on Arrival
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ fontSize: "0.75rem" }}
              >
                Pay at the theater counter
              </Typography>
            </PaymentOption>
          </Grid>
        </Grid>

        {/* Payment Instructions */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "#1a237e", fontWeight: 600 }}
          >
            Payment Instructions
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Online Payment"
                secondary="Select your preferred payment method and follow the secure payment process. You will receive a confirmation email after successful payment."
                primaryTypographyProps={{ fontSize: "0.9rem" }}
                secondaryTypographyProps={{ fontSize: "0.8rem" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Pay on Arrival"
                secondary="Please arrive at least 30 minutes before the show time. Present your booking confirmation at the counter to complete the payment."
                primaryTypographyProps={{ fontSize: "0.9rem" }}
                secondaryTypographyProps={{ fontSize: "0.8rem" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Important Notes"
                secondary="• Keep your booking confirmation handy\n• For premium seats, please arrive early\n• Payment must be completed before the show starts"
                primaryTypographyProps={{ fontSize: "0.9rem" }}
                secondaryTypographyProps={{ fontSize: "0.8rem" }}
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentPage;
