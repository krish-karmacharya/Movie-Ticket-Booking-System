import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";








import dns from "node:dns/promises";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import cors from "cors";

// Fix for Node.js v24 on Windows: force DNS servers so MongoDB SRV lookup works
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose
  .connect( `mongodb+srv://kreeshk123:${process.env.MONGODB_PASSWORD}@movietrial1.b5v6y.mongodb.net/?retryWrites=true&w=majority&appName=movietrial1`)
  
  .then(() =>
    app.listen(5000, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((e) => console.log(e));
