import mongoose from 'mongoose';



const bookingSchema = new mongoose.Schema({
  shippingFrom: { type: String, required: true },
  shippingTo: { type: String, required: true },
  date: { type: String, required: true },
  item: { type: String, required: true },
  totalWeight: { type: Number, required: true },
  grossWeight: { type: Number, required: true },
  pieces: { type: Number, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});


const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;