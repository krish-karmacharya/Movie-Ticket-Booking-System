import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../api-helpers/api-helpers";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings();
        setBookings(response?.bookings ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Movie</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.movie?.title ?? "—"}</TableCell>
                <TableCell>{booking.user?.name ?? "—"}</TableCell>
                <TableCell>
                  {booking.date
                    ? new Date(booking.date).toLocaleDateString()
                    : "—"}
                </TableCell>
                <TableCell>
                  {booking.seats?.length
                    ? booking.seats.map((seat) => seat.number).join(", ")
                    : booking.seatNumber ?? "—"}
                </TableCell>
                <TableCell>₹{booking.totalPrice}</TableCell>
                <TableCell>
                  <Typography
                    color={
                      booking.status === "confirmed"
                        ? "success.main"
                        : booking.status === "cancelled"
                        ? "error.main"
                        : "warning.main"
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBookings;
