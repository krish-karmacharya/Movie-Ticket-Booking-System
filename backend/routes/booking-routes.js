import express from "express";
import {
  deleteBooking,
  getBookingById,
  newBooking,
  getBookedSeats,
} from "../controllers/booking-controller.js";

const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingById);
bookingsRouter.post("/", newBooking);
bookingsRouter.delete("/:id", deleteBooking);
bookingsRouter.get("/booked-seats/:movieId", getBookedSeats);
export default bookingsRouter;
