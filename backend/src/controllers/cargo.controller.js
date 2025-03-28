import Booking from "../models/shipment.model.js";
import mongoose from "mongoose";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Cargo Booking Data
export const cargoData = async (req, res) => {
  const {
    shippingFrom, shippingTo, date, item,
    totalWeight, length, width, height,
    weight, grossWeight, pieces
  } = req.body;
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  
  try {
    console.log("Received data:", req.body);
    
    const booking = new Booking({
      shippingFrom, shippingTo, date, item,
      totalWeight, grossWeight, pieces,
      length, width, height, weight,
      user: userId,
    });
    
    await booking.save();
    res.status(200).json({ message: "Booking saved successfully", booking });
  } catch (error) {
    console.error("Error in cargoData:", error);
    res.status(500).json({ message: "Server error", error });
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
      .sort({ date: -1 })
      .limit(5);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching recent bookings:", error);
    res.status(500).json({ message: "Server error", error });
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
    res.status(500).json({ message: "Server error", error });
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
    res.status(500).json({ message: "Server error", error });
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
    res.status(500).json({ message: "Server error", error });
  }
};

