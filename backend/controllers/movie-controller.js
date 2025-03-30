import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";

export const addMovie = async (req, res, next) => {
  try {
    // Check if authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No authorization header" });
    }

    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken) {
      return res.status(401).json({ message: "No token found" });
    }

    let adminId;
    try {
      const decrypted = jwt.verify(extractedToken, process.env.SECRET_KEY);
      adminId = decrypted.id;
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Create new movie
    const { title, description, releaseDate, posterUrl, featured, actors } =
      req.body;

    // Validate required fields
    if (!title || !description || !posterUrl || !releaseDate || !actors) {
      return res.status(422).json({
        message: "Invalid Inputs",
        details:
          "Title, description, posterUrl, releaseDate, and actors are required",
      });
    }

    let movie;
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      // First check if admin exists before creating movie
      const adminUser = await Admin.findById(adminId).session(session);
      if (!adminUser) {
        throw new Error("Admin not found");
      }

      // Initialize addedMovies array if it doesn't exist
      if (!adminUser.addedMovies) {
        adminUser.addedMovies = [];
      }

      movie = new Movie({
        title,
        description,
        releaseDate: new Date(`${releaseDate}`),
        featured: featured || false,
        actors: Array.isArray(actors) ? actors : [actors],
        admin: adminId,
        posterUrl,
      });

      // Save movie first
      const savedMovie = await movie.save({ session });

      // Update admin's movies list
      adminUser.addedMovies.push(savedMovie._id);
      await adminUser.save({ session });

      await session.commitTransaction();

      return res.status(201).json({
        message: "Movie added successfully",
        movie: savedMovie,
      });
    } catch (err) {
      if (session) {
        await session.abortTransaction();
      }
      throw err; // Let the outer catch block handle it
    } finally {
      if (session) {
        session.endSession();
      }
    }
  } catch (err) {
    console.error("Error adding movie:", err);
    return res.status(500).json({
      message: "Failed to add movie",
      error: err.message,
    });
  }
};

export const getAllMovies = async (req, res, next) => {
  console.log("GET /movie - Fetching all movies");
  try {
    const movies = await Movie.find().lean();
    console.log("Found movies:", movies);
    return res.status(200).json({ movies });
  } catch (err) {
    console.error("Error fetching movies:", err);
    return res
      .status(500)
      .json({ message: "Request Failed", error: err.message });
  }
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Movie ID format" });
  }

  try {
    const movie = await Movie.findById(id).lean();
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json({ movie });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Request Failed", error: err.message });
  }
};

export const deleteMovie = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid movie ID format" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const movie = await Movie.findById(id).populate("admin").session(session);

    if (!movie) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Movie not found" });
    }

    // Remove movie from admin's addedMovies array
    movie.admin.addedMovies = movie.admin.addedMovies.filter(
      (movieId) => movieId.toString() !== movie._id.toString()
    );

    // Save the updated admin document
    await movie.admin.save({ session });

    // Delete the movie
    await Movie.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    return res.status(200).json({ message: "Movie successfully deleted" });
  } catch (err) {
    await session.abortTransaction();
    return res
      .status(500)
      .json({ message: "Error deleting movie", error: err.message });
  }
};
