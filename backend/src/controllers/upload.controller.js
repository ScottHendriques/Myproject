import upload from "../middleware/image.middleware.js";
import Booking from "../models/shipment.model.js";

export const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    //const { filename, path: filepath, mimetype, size } = req.file;
    const { shippingFrom, shippingTo, date, item, totalWeight, lenght, width, height, weight, grossWeight } = req.body;
    const userId = req.params.userId ;

    try {
      const booking = new Booking({
        shippingFrom,
        shippingTo,
        date,
        item,
        totalWeight,
        lenght,
        width,
        height,
        weight,
        //description: JSON.parse(description),
        grossWeight,
        user: userId,
      });
      await booking.save();
      res.status(200).json({ message: "File uploaded successfully", booking });
    } catch (error) {
      res.status(500).json({ message: "Error saving file to database", error });
    }
  });
};