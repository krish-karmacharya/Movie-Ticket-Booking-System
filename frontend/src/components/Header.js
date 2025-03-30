import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  TextField,
  Toolbar,
  Button,
  Box,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
  Snackbar,
  Alert,
  Badge,
  Tooltip,
  Fade,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "#1a237e",
  boxShadow: "none",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "25px",
  textTransform: "none",
  transition: "all 0.3s ease-in-out",
  color: "#E6D5C7",
  "&:hover": {
    color: "#C4A484",
    backgroundColor: "rgba(196, 164, 132, 0.1)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#8B4513",
  "&:hover": {
    backgroundColor: "#654321",
  },
}));

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        if (data && Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          setError("Failed to fetch movies");
          setOpen(true);
        }
      })
      .catch((err) => {
        setError("Failed to fetch movies");
        setOpen(true);
      });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    handleClose();
    navigate("/");
  };

  const handleChange = (e, val) => {
    setValue(val);
    if (val) {
      const movie = movies.find((m) => m.title === val);
      if (movie && movie._id) {
        if (isUserLoggedIn) {
          navigate(`/booking/${movie._id}`);
        } else {
          navigate(`/movies`);
        }
      }
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {isAdminLoggedIn ? (
          <>
            <ListItem
              button
              component={Link}
              to="/addMovies"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <AddIcon sx={{ color: "#6C757D" }} />
              </ListItemIcon>
              <ListItemText primary="Add Movie" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admin/bookings"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon sx={{ color: "#6C757D" }} />
              </ListItemIcon>
              <ListItemText primary="View Bookings" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/profile"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: "#6C757D" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => {
                dispatch(adminActions.logout());
                handleDrawerToggle();
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#6C757D" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : isUserLoggedIn ? (
          <>
            <ListItem
              button
              component={Link}
              to="/user"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: "#6C757D" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => {
                logout(isAdminLoggedIn);
                handleDrawerToggle();
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#6C757D" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              component={Link}
              to="/auth"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: "#6C757D" }} />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admin"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: "#6C757D" }} />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ py: 1 }}>
        <Fade in timeout={500}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#495057",
              mr: 2,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <MovieIcon sx={{ fontSize: 40, color: "#FFFFFF", mr: 1 }} />
            <Box
              component="span"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.5px",
                display: { xs: "none", sm: "block" },
              }}
            >
              MovieHub
            </Box>
          </Box>
        </Fade>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Autocomplete
            value={value}
            onChange={handleChange}
            options={movies.map((movie) => movie.title)}
            popupIcon={null}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search movies..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
                sx={{
                  width: { xs: "200px", sm: "300px", md: "400px" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FFFFFF",
                    borderRadius: "25px",
                    "&:hover": {
                      backgroundColor: "#F8F9FA",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#FFFFFF",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #E9ECEF",
                  },
                }}
              />
            )}
          />
        </Box>

        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAdminLoggedIn ? (
              <>
                <StyledButton
                  component={Link}
                  to="/addMovies"
                  startIcon={<AddIcon />}
                >
                  Add Movie
                </StyledButton>
                <StyledButton
                  component={Link}
                  to="/admin/bookings"
                  startIcon={<ConfirmationNumberIcon />}
                >
                  View Bookings
                </StyledButton>
                <StyledButton
                  component={Link}
                  to="/profile"
                  startIcon={<PersonIcon />}
                >
                  Profile
                </StyledButton>
                <StyledButton
                  onClick={() => dispatch(adminActions.logout())}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </StyledButton>
              </>
            ) : isUserLoggedIn ? (
              <>
                <StyledButton
                  component={Link}
                  to="/user"
                  startIcon={<PersonIcon />}
                >
                  Profile
                </StyledButton>
                <StyledButton
                  onClick={() => dispatch(userActions.logout())}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </StyledButton>
              </>
            ) : (
              <>
                <StyledButton
                  component={Link}
                  to="/auth"
                  startIcon={<PersonIcon />}
                >
                  Login
                </StyledButton>
                <StyledButton
                  component={Link}
                  to="/admin"
                  startIcon={<PersonIcon />}
                >
                  Admin
                </StyledButton>
              </>
            )}
          </Box>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "#6C757D" }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </StyledAppBar>
  );
};

export default Header;
