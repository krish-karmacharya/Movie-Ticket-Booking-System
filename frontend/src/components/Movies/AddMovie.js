import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddMovie = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const validateInputs = () => {
    const newErrors = {};
    if (!inputs.title.trim()) newErrors.title = "Title is required";
    if (!inputs.description.trim())
      newErrors.description = "Description is required";
    if (!inputs.posterUrl.trim())
      newErrors.posterUrl = "Poster URL is required";
    if (!inputs.releaseDate) newErrors.releaseDate = "Release date is required";
    if (actors.length === 0)
      newErrors.actors = "At least one actor is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddActor = () => {
    if (actor.trim()) {
      setActors([...actors, actor.trim()]);
      setActor("");
      setErrors((prev) => ({ ...prev, actors: "" }));
    }
  };

  const handleRemoveActor = (indexToRemove) => {
    setActors(actors.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await addMovie({ ...inputs, actors });
      if (res) {
        setMessage("Movie added successfully!");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => {
          navigate("/user-admin");
        }, 2000);
      } else {
        throw new Error("Failed to add movie");
      }
    } catch (err) {
      console.log(err);
      setMessage("Failed to add movie. Please try again.");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: "#1a237e", fontWeight: 600 }}
        >
          Add New Movie
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormLabel sx={{ mb: 1, display: "block" }}>Title</FormLabel>
              <TextField
                fullWidth
                name="title"
                value={inputs.title}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel sx={{ mb: 1, display: "block" }}>
                Description
              </FormLabel>
              <TextField
                fullWidth
                name="description"
                value={inputs.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel sx={{ mb: 1, display: "block" }}>Poster URL</FormLabel>
              <TextField
                fullWidth
                name="posterUrl"
                value={inputs.posterUrl}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.posterUrl}
                helperText={errors.posterUrl}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel sx={{ mb: 1, display: "block" }}>
                Release Date
              </FormLabel>
              <TextField
                fullWidth
                type="date"
                name="releaseDate"
                value={inputs.releaseDate}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={!!errors.releaseDate}
                helperText={errors.releaseDate}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel sx={{ mb: 1, display: "block" }}>Actors</FormLabel>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  value={actor}
                  onChange={(e) => setActor(e.target.value)}
                  variant="outlined"
                  placeholder="Enter actor name"
                  error={!!errors.actors}
                  helperText={errors.actors}
                />
                <IconButton
                  onClick={handleAddActor}
                  sx={{
                    bgcolor: "#1a237e",
                    color: "white",
                    "&:hover": { bgcolor: "#000051" },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {actors.map((actor, index) => (
                  <Chip
                    key={index}
                    label={actor}
                    onDelete={() => handleRemoveActor(index)}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                      bgcolor: "#1a237e",
                      color: "white",
                      "& .MuiChip-deleteIcon": {
                        color: "white",
                        "&:hover": { color: "#ff1744" },
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Checkbox
                  checked={inputs.featured}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                />
                <FormLabel>Featured Movie</FormLabel>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: "#1a237e",
                  "&:hover": { bgcolor: "#000051" },
                  py: 1.5,
                }}
              >
                Add Movie
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={2000}
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

export default AddMovie;
