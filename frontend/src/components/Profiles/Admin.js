import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { getAdminById, deleteMovie } from "../../api-helpers/api-helpers";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Admin = () => {
  const [admin, setAdmin] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAdminData = () => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch admin data");
        setOpen(true);
      });
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteMovie(id)
      .then((res) => {
        setSuccess("Movie deleted successfully!");
        setOpen(true);
        // Refresh admin data after successful deletion
        fetchAdminData();
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to delete movie");
        setOpen(true);
      });
  };

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent={"column"}
        alignItems="center"
        minHeight="100vh"
      >
        <Box width="70%" display="flex" flexDirection={"column"}>
          <Typography
            variant="h3"
            fontFamily={"verdana"}
            textAlign="center"
            padding={2}
          >
            Added Movies
          </Typography>

          <Box
            margin="auto"
            display="flex"
            flexDirection={"column"}
            width="80%"
          >
            <List>
              {admin &&
                admin.addedMovies.map((movie, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      borderRadius: 1,
                      "&:hover": {
                        bgcolor: "#00b377",
                      },
                    }}
                    key={index}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "100px", textAlign: "left" }}
                    >
                      Movie: {movie.title}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "100px", textAlign: "left" }}
                    >
                      Releasing: {new Date(movie.releaseDate).toDateString()}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDelete(movie._id)}
                      color="error"
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Admin;
