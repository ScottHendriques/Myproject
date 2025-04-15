import express from "express";
import {
  cargoData,
  createBooking,
  getRecentBookings,
  getTopProducts,
  getTopDestinations,
  getTotalBookings,
} from "../controllers/cargo.controller.js";

const router = express.Router();

router.post("/cargo/:userId", cargoData);
router.post("/bookings", createBooking); // Added for StripePaymentPage
router.get("/recent/:userId", getRecentBookings);
router.get("/top-products/:userId", getTopProducts);
router.get("/top-destinations/:userId", getTopDestinations);
router.get("/total-bookings/:userId", getTotalBookings);

export default router;