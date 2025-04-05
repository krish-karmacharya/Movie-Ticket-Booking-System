import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { DeleteForeverOutlined } from "@mui/icons-material/";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { deleteBooking, getUserBookings } from "../../helpers/api-helpers";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const onResReceived = (res) => {
    setBookings(res.bookings);
  };

  useEffect(() => {
    getUserBookings()
      .then(onResReceived)
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        setBookings(bookings.filter((booking) => booking._id !== id));
        setSnackbarMessage("Booking deleted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage("Failed to delete booking");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box width="100%" display={"flex"}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        width="30%"
      >
        <PersonRoundedIcon sx={{ fontSize: "20rem" }} />
        <Typography
          padding={1}
          width="100px"
          textAlign={"center"}
          border="1px solid #ccc"
          borderRadius={10}
        >
          Name: {bookings.length > 1 && bookings[0].user.name}
        </Typography>
      </Box>
      <Box width="70%" display="flex" flexDirection={"column"}>
        <Typography
          variant="h3"
          fontFamily={"verdana"}
          textAlign="center"
          padding={2}
        >
          Bookings
        </Typography>

        <Box margin="auto" display="flex" flexDirection={"column"} width="80%">
          <List>
            {bookings &&
              bookings.map((booking, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#00d386",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                  key={index}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Movie: {booking.movie.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Seat: {booking.seatNumber}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Date: {new Date(booking.date).toDateString()}
                  </ListItemText>
                  <IconButton
                    onClick={() => handleDelete(booking._id)}
                    color="error"
                  >
                    <DeleteForeverOutlined />
                  </IconButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
