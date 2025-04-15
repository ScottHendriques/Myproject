import Booking from "../models/shipment.model.js";
import mongoose from "mongoose";

// Create Booking After Payment
export const createBooking = async (req, res) => {
  const {
    userId,
    shippingFrom,
    shippingTo,
    preferredShippingDate,
    apiDate,
    item,
    totalWeight,
    grossWeight,
    pieces,
    length,
    width,
    height,
    weight,
    promoCode,
    finalPrice,
    flightId,
    paymentIntentId,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    console.log("Creating booking with data:", req.body);

    const booking = new Booking({
      user: userId,
      shippingFrom,
      shippingTo,
      preferredShippingDate,
      apiDate,
      item,
      totalWeight,
      grossWeight,
      pieces,
      length,
      width,
      height,
      weight,
      promoCode,
      finalPrice,
      flightId,
      paymentIntentId,
      status: "confirmed",
    });

    await booking.save();
    console.log("Booking saved successfully:", booking._id);
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", {
      message: error.message,
      stack: error.stack,
      details: error.errors || {},
    });
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

// Cargo Booking Data (Updated for Pre-Booking or Draft)
export const cargoData = async (req, res) => {
  const {
    shippingFrom,
    shippingTo,
    preferredShippingDate,
    apiDate,
    item,
    totalWeight,
    grossWeight,
    pieces,
    length,
    width,
    height,
    weight,
  } = req.body;
  const userId = req.params.userId;

  console.log("Incoming /cargo/:userId request from:", {
    url: req.originalUrl,
    method: req.method,
    headers: req.headers,
    body: req.body,
    referer: req.headers.referer,
    stackTrace: new Error().stack, // Added to trace the server-side call
  });

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const booking = new Booking({
      shippingFrom,
      shippingTo,
      preferredShippingDate,
      apiDate,
      item,
      totalWeight,
      grossWeight,
      pieces,
      length,
      width,
      height,
      weight,
      user: userId,
      status: "pending",
    });

    await booking.save();
    console.log("Cargo booking saved successfully:", booking._id);
    res.status(200).json({ message: "Booking saved successfully", booking });
  } catch (error) {
    console.error("Error in cargoData:", {
      message: error.message,
      stack: error.stack,
      details: error.errors || {},
    });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Recent Bookings
export const getRecentBookings = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching recent bookings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Top Products
export const getTopProducts = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const topProducts = await Booking.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$item", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);
    res.status(200).json(topProducts);
  } catch (error) {
    console.error("Error fetching top products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Top Destinations
export const getTopDestinations = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const topDestinations = await Booking.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$shippingTo", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);
    res.status(200).json(topDestinations);
  } catch (error) {
    console.error("Error fetching top destinations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Total Bookings
export const getTotalBookings = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const totalBookings = await Booking.countDocuments({ user: userId });
    res.status(200).json({ totalBookings });
  } catch (error) {
    console.error("Error fetching total bookings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};