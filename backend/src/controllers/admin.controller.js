import Booking from "../models/shipment.model.js";

// Get Recent Shipments (Admin)
export const getAdminRecentShipments = async (req, res) => {
    try {
      const bookings = await Booking.find()
        .sort({ date: -1 })
        .limit(5)
        .populate('user', 'fullname email');
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching admin recent shipments:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Get Top Cargo Types (Admin)
  export const getAdminTopCargoTypes = async (req, res) => {
    try {
      const topCargoTypes = await Booking.aggregate([
        { $group: { _id: "$item", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 3 },
      ]);
      res.status(200).json(topCargoTypes);
    } catch (error) {
      console.error("Error fetching admin top cargo types:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Get Top Routes (Admin)
  export const getAdminTopRoutes = async (req, res) => {
    try {
      const topRoutes = await Booking.aggregate([
        {
          $group: {
            _id: { from: "$shippingFrom", to: "$shippingTo" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 3 },
        {
          $project: {
            _id: { $concat: ["$_id.from", " to ", "$_id.to"] },
            count: 1,
          },
        },
      ]);
      res.status(200).json(topRoutes);
    } catch (error) {
      console.error("Error fetching admin top routes:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Get Total Shipments (Admin)
  export const getAdminTotalShipments = async (req, res) => {
    try {
      const totalShipments = await Booking.countDocuments();
      res.status(200).json({ totalShipments });
    } catch (error) {
      console.error("Error fetching admin total shipments:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

  export const getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate('user', 'fullname email')
        .sort({ preferredDate: -1 }); // Sort by preferredDate if it exists, else date
      // Convert date fields to ISO string for consistency
      const formattedBookings = bookings.map(booking => ({
        ...booking._doc,
        date: booking.date ? new Date(booking.date).toISOString() : null,
        preferredDate: booking.preferredDate ? new Date(booking.preferredDate).toISOString() : null,
      }));
      res.status(200).json(formattedBookings);
    } catch (error) {
      console.error('Error fetching all bookings:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };