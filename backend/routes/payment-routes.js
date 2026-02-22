import express from "express";
import { initiateKhaltiPayment, lookupKhaltiPayment } from "../controllers/payment-controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/khalti/initiate", initiateKhaltiPayment);
paymentRouter.post("/khalti/lookup", lookupKhaltiPayment);

export default paymentRouter;
