import Booking from "../models/shipment.model.js";

export const cargoData = async (req, res) => {
  const { shippingFrom, shippingTo, date, item, totalWeight, length, width, height, weight, grossWeight } = req.body;
  const userId = req.params.userId;

  try {
    const booking = new Booking({
      shippingFrom,
      shippingTo,
      date,
      item,
      totalWeight,
      length,
      width,
      height,
      weight,
      grossWeight,
      user: userId,
    });
    await booking.save();
    res.status(200).json({ message: "Booking saved successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error saving booking to database", error });
  }
};