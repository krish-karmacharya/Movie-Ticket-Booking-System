import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Bookings from "../models/Bookings.js";
import mongoose from "mongoose";

export const getAllUsers = async (res) => {
  try {
    const users = await User.find().lean();
    return res.status(200).json({ users });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unexpected Error Occurred", error: err.message });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(422).json({ message: "All fields are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ message: "Invalid email format" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ id: user._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ message: "Unexpected Error Occurred", error: err.message });
  }
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID format" });
  }

  // Validate that at least one field is provided
  if (!name && !email && !password) {
    return res
      .status(422)
      .json({ message: "At least one field is required for update" });
  }

  // Validate email format if provided
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({ message: "Invalid email format" });
    }
  }

  let updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = bcrypt.hashSync(password);

  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Updated Successfully", user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ message: "Update Failed", error: err.message });
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID format" });
  }

  try {
    const user = await User.findByIdAndDelete(id).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Delete Failed", error: err.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Email and password are required" });
  }

  try {
    // Only select necessary fields to improve performance
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    })
      .select("_id name email password")
      .lean();

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // Remove password from response
    delete existingUser.password;

    return res.status(200).json({
      message: "Login Successful",
      ...existingUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Login Failed", error: err.message });
  }
};

export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID format" });
  }

  try {
    const bookings = await Bookings.find({ user: id })
      .populate({
        path: "movie",
        select: "title description posterUrl releaseDate",
        options: { lean: true },
      })
      .populate({
        path: "user",
        select: "name email",
        options: { lean: true },
      })
      .lean();

    // Filter out bookings with null movie references
    const validBookings = bookings.filter((booking) => booking.movie !== null);

    return res.status(200).json({
      bookings: validBookings,
      totalBookings: validBookings.length,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to get Bookings",
      error: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID format" });
  }

  try {
    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to get User", error: err.message });
  }
};
