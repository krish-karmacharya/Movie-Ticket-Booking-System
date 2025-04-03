import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: 20,
          maxWidth: "400px",
          width: "100%",
          minHeight: isAdmin ? "450px" : "auto",
        },
      }}
      open={true}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          LinkComponent={Link}
          to="/"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 1,
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            textAlign: "center",
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
            color: "white",
            borderRadius: "20px 20px 0 0",
            minHeight: isAdmin ? "100px" : "auto",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {isAdmin
              ? "Welcome Admin"
              : isSignup
              ? "Create Account"
              : "Welcome Back"}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {isAdmin
              ? "Sign in to access admin dashboard"
              : isSignup
              ? "Join us to start booking movies"
              : "Sign in to your account"}
          </Typography>
        </Paper>

        <Box sx={{ p: 3, minHeight: isAdmin ? "350px" : "auto" }}>
          <form onSubmit={handleSubmit}>
            {!isAdmin && isSignup && (
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="email"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "#1a237e",
                "&:hover": {
                  bgcolor: "#000051",
                  transform: "scale(1.02)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            {!isAdmin && (
              <>
                <Divider sx={{ my: 3 }}>OR</Divider>
                <Button
                  onClick={() => setIsSignup(!isSignup)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#1a237e",
                    color: "#1a237e",
                    "&:hover": {
                      borderColor: "#000051",
                      bgcolor: "rgba(26, 35, 126, 0.04)",
                    },
                  }}
                >
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </>
            )}
          </form>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AuthForm;
