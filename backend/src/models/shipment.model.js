import mongoose from 'mongoose';



const bookingSchema = new mongoose.Schema({
  shippingFrom: { type: String, required: true },
  shippingTo: { type: String, required: true },
  date: { type: Date, required: true },
  item: { type: String, required: true },
  totalWeight: { type: Number, required: true },
  grossWeight: { type: Number, required: true },
  description: [
    {
      pieces: Number,
      length: Number,
      width: Number,
      height: Number,
      weight: Number,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});


const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;