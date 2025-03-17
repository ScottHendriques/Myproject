import Booking from "../models/shipment.model.js";

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