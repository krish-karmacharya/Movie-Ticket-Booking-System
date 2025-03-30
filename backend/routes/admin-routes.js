import express from "express";
import {
  addAdmin,
  adminLogin,
  getAdminById,
  getAdmins,
  getAllBookings,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get("/", getAdmins);
adminRouter.get("/:id", getAdminById);
adminRouter.get("/bookings/all", getAllBookings);

export default adminRouter;
