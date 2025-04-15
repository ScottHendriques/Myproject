import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  shippingFrom: { type: String, required: true },
  shippingTo: { type: String, required: true },
  preferredShippingDate: { type: String, required: true }, // Match frontend
  apiDate: { type: String }, // Match frontend
  item: { type: String, required: true },
  totalWeight: { type: Number, required: true },
  grossWeight: { type: Number, required: true },
  pieces: { type: Number, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  promoCode: { type: String },
  finalPrice: { type: Number },
  flightId: { type: String },
  paymentIntentId: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "pending", enum: ["pending", "confirmed", "cancelled"] },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;