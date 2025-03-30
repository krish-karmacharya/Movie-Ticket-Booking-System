import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, seats, user } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(movie) ||
    !mongoose.Types.ObjectId.isValid(user)
  ) {
    return res.status(400).json({ message: "Invalid movie or user ID" });
  }

  if (!Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ message: "Please select at least one seat" });
  }

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error finding movie or user", error: err.message });
  }

  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found with given ID" });
  }

  // Validate booking date
  const bookingDate = new Date(date);
  const movieReleaseDate = new Date(existingMovie.releaseDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    return res.status(400).json({ message: "Cannot book for past dates" });
  }

  if (bookingDate < movieReleaseDate) {
    return res
      .status(400)
      .json({ message: "Cannot book before movie release date" });
  }

  // Check for existing bookings with the same seats on the same date
  try {
    const existingBookings = await Bookings.find({
      movie,
      date: {
        $gte: new Date(bookingDate.setHours(0, 0, 0, 0)),
        $lt: new Date(bookingDate.setHours(23, 59, 59, 999)),
      },
    });

    // Get all booked seat numbers for the given date
    const bookedSeats = existingBookings.flatMap((booking) =>
      booking.seats.map((seat) => seat.number)
    );

    // Check if any of the requested seats are already booked
    const duplicateSeats = seats.filter((seatNumber) =>
      bookedSeats.includes(seatNumber)
    );

    if (duplicateSeats.length > 0) {
      return res.status(400).json({
        message: `Seats ${duplicateSeats.join(
          ", "
        )} are already booked for this date`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error checking existing bookings",
      error: err.message,
    });
  }

  // Define premium seats (first 5 and last 5 seats)
  const premiumSeats = [1, 2, 3, 4, 5, 26, 27, 28, 29, 30];

  try {
    // Calculate price for each seat
    const normalSeatPrice = 350; // Regular seat price
    const premiumSeatPrice = 750; // Premium seat price

    const seatsWithPrices = seats.map((seatNumber) => ({
      number: seatNumber,
      price: premiumSeats.includes(seatNumber)
        ? premiumSeatPrice
        : normalSeatPrice,
    }));

    // Calculate total price
    const totalPrice = seatsWithPrices.reduce(
      (sum, seat) => sum + seat.price,
      0
    );

    let booking;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      booking = new Bookings({
        movie,
        date,
        seats: seatsWithPrices,
        totalPrice,
        user,
        status: "pending",
      });

      existingUser.bookings.push(booking._id);
      existingMovie.bookings.push(booking._id);

      await existingUser.save({ session });
      await existingMovie.save({ session });
      await booking.save({ session });

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      return res
        .status(500)
        .json({ message: "Unable to create booking", error: err.message });
    }

    if (!booking) {
      return res.status(500).json({ message: "Unable to create a booking" });
    }

    // Populate movie and user details
    await booking.populate("movie", "title posterUrl");
    await booking.populate("user", "name email");

    return res.status(201).json({
      message: `Booking created successfully. Total price: ₹${totalPrice.toFixed(
        2
      )}`,
      booking: booking,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    return res
      .status(500)
      .json({ message: "Error creating booking", error: err.message });
  }
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid booking ID format" });
  }

  try {
    const booking = await Bookings.findById(id)
      .populate("user", "name email")
      .populate("movie", "title posterUrl")
      .lean();

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ booking });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching booking", error: err.message });
  }
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid booking ID format" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Bookings.findById(id)
      .populate("user")
      .populate("movie")
      .session(session);

    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Booking not found" });
    }

    // Remove booking from user's bookings array
    booking.user.bookings = booking.user.bookings.filter(
      (bookingId) => bookingId.toString() !== booking._id.toString()
    );

    // Remove booking from movie's bookings array
    booking.movie.bookings = booking.movie.bookings.filter(
      (bookingId) => bookingId.toString() !== booking._id.toString()
    );

    // Save the updated user and movie documents
    await booking.user.save({ session });
    await booking.movie.save({ session });

    // Delete the booking
    await Bookings.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    return res.status(200).json({ message: "Booking successfully deleted" });
  } catch (err) {
    await session.abortTransaction();
    return res
      .status(500)
      .json({ message: "Error deleting booking", error: err.message });
  }
};

export const getBookedSeats = async (req, res, next) => {
  const { movieId } = req.params;
  const { date } = req.query;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    // Convert date string to Date object and set time range for the entire day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // Find all bookings for the movie on the specified date
    const bookings = await Bookings.find({
      movie: movieId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Extract all booked seat numbers
    const bookedSeats = bookings.flatMap((booking) =>
      booking.seats.map((seat) => seat.number)
    );

    return res.status(200).json({ bookedSeats });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching booked seats",
      error: err.message,
    });
  }
};
