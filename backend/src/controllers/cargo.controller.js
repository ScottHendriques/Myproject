import Booking from "../models/shipment.model.js";
import mongoose from "mongoose";

export const cargoData = async (req, res) => {
  const { shippingFrom, shippingTo, date, item, totalWeight, length, width, height, weight, grossWeight } = req.body;
  const userId = req.params.userId;

  console.log("Request Body:", req.body);
  console.log ("User ID:", userId);
  
  try {
    console.log("Received data:", req.body);

    const booking = new Booking({
      shippingFrom: req.body.shippingFrom,
      shippingTo: req.body.shippingTo,
      date: req.body.date,
      item: req.body.item,
      totalWeight: req.body.totalWeight,
      grossWeight: req.body.grossWeight,
      pieces: req.body.pieces,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      weight: req.body.weight,
      user: userId,
    });
    await booking.save();
    res.status(200).json({ message: "Booking saved successfully", booking });
  } catch (error) {
    console.error("Error in cargoData:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getRecentBookings = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.find({ user: userId })
      .sort({ date: -1 }) // Sort by date (most recent first)
      .limit(5); // Limit to 5 recent bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching recent bookings:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTopProducts = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

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

export const getTopDestinations = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
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